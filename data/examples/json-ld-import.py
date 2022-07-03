import json, requests, io, zipfile, gzip, copy
import xml.etree.ElementTree as et

from datetime import datetime

from google.cloud import storage
from elasticsearch import Elasticsearch
import pandas as pd
from lxml import etree
import orjson

def process_inventory(inventory_zip, archive, inventory, access, ead, mets):

    zip_archive = zipfile.ZipFile(inventory_zip)

    ld_graph = []
    inventory_id = ''

    if archive.lower() == 'nl-hana':
        inventory_id = 'https://archief.nl/doc/transcriptie/' + access + '/' + inventory
    else:
        inventory_id = 'https://archief.nl/doc/transcriptie/' + archive.lower() + '/' + access + '/' + inventory

    sel = mets.loc[
        (mets['Inventarisnummer'] == inventory) & (mets['Toegangsnummer'] == access) & (mets['Instelling'] == archive)
    ]

    print(inventory_id)

    current_mets_files = None
    if len(sel) == 1:
        metslink = sel['METS link'].iloc[0]
        current_mets_files = parse_mets(metslink)

    manifest = {
        '@id': inventory_id,
        '@type': 'Manifest',
        'label':  inventory,
        'seeAlso': {"rico:RecordSet": get_rico(inventory, ead)},
        'items': []
    }

    ld_graph.append(manifest)

    pagecount = 0

    ziplist = zip_archive.namelist()
    ziplist.sort()

    for fn in ziplist:

        if fn[len(fn) -3 : len(fn)] == 'xml':
            pagecount += 1

            parts = fn.split('_')
            pagenr = parts[-1][0: len(parts[-1]) - 4]

            canvas_id = ''
            if archive.lower() == 'nl-hana':
                canvas_id = 'https://archief.nl/doc/transcriptie/' + access + '/' + inventory + '/' + pagenr
            else:
                canvas_id = 'https://archief.nl/doc/transcriptie/' + archive.lower() + '/' + access + '/' + inventory + '/' + pagenr

            manifest['items'].append({
                '@id': canvas_id,
                "@type": "Canvas",
                "label": str(pagenr)
            })

            (body, height, width) = parse_page(zip_archive.open(fn))
            iiif_image = None

            if current_mets_files and 'iiif' in current_mets_files and int(pagecount)-1 < len(current_mets_files['iiif']) :

                ld_graph.append({
                    '@id': canvas_id,
                    '@type': 'Canvas',
                    "label": pagenr,
                    "height": num(height),
                    "width": num(width),
                    "items": [ {
                        "type": "AnnotationPage",
                        "items": [
                            {   "@type": "Annotation",
                                    "motivation": "painting",
                                    "body": {
                                        "@id": current_mets_files['iiif'][int(pagecount)-1][:-10] + "/full/max/0/default.jpg",
                                        "@type": "Image",
                                        "format": "image/jpeg",
                                        "service": {
                                            "@id": current_mets_files['iiif'][int(pagecount)-1],
                                            "@type": "ImageService2",
                                            "profile": "http://iiif.io/api/image/2/level2.json"
                                        },
                                        "height": num(height),
                                        "width": num(width)
                                    },
                                    "target": canvas_id
                            }
                        ]
                    }],
                    "annotations": [ {
                        "type": "AnnotationPage",
                        "items": [
                            {
                                "@type": "Annotation",
                                "motivation": "supplementing",
                                "body": body,
                                "target": canvas_id
                            }
                        ]
                    }]
                })
            else:
                print ('mets of ' + str(pagecount) + ' is missing')
                ld_graph.append({
                    '@id': canvas_id,
                    '@type': 'Canvas',
                    "label": pagenr,
                    "height": num(height),
                    "width": num(width),
                    "items": [ {
                        "type": "AnnotationPage",
                        "items": [
                            {
                                "@type": "Annotation",
                                "motivation": "supplementing",
                                "body": body,
                                "target": canvas_id
                            }
                        ]
                    }]
                })


    json_ld = {
        "@context": "https://www.zoekintrancripties.nl/ld/context.json",
        "@graph": ld_graph
    }
    return json_ld


def get_url(url, attempts=1):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response

    except requests.exceptions.RequestException as err:
        print ("Request error ",err)
        if attempts > 0:
            print("Let's try again")
            return get_url(url, attempts -1)

def parse_mets(url):

    response = get_url(url, attempts=3)

    count = 0
    groupname = ""
    duuid = ""

    images = []
    thumbs = []
    iiif_links = []

    try:

        for event, elem in et.iterparse(io.StringIO(response.text), events={'start', 'end'}):
            if elem.tag == '{http://www.loc.gov/METS/}altRecordID' and event == 'end':

                uuid = elem.text.replace('-','')

                i = 0
                elem = []
                while i + 2 <= len(uuid):
                    substr = uuid[i: i + 2]
                    elem.append(substr)
                    i += 2

                duuid = '/'.join(elem)

            elif elem.tag == '{http://www.loc.gov/METS/}fileGrp' and event == 'start':
                count = 0
                groupname = elem.attrib['USE']

            elif elem.tag == '{http://www.loc.gov/METS/}file' and event == 'end':
                count += 1
                link = elem[0].attrib['{http://www.w3.org/1999/xlink}href']

                if groupname == 'DEFAULT':
                    images.append(link)
                    iiif_link = "https://service.archief.nl/iip/" + duuid + '/' + link[link.rindex('/') + 1: ] + '.jp2'
                    #iiif_links.append(iiif_link)

                elif groupname == 'THUMBS':
                    thumbs.append(link)

                elif groupname == 'DISPLAY':
                    iiif_links.append(link)

    except:

        print("mets parsing error")

    finally:

        return {'images': images, 'thumbs': thumbs, 'iiif': iiif_links}

def mets_registry(bin):

    current_mets = pd.read_excel(bin)
    current_mets["Inventarisnummer"] = current_mets["Inventarisnummer"].astype(str)
    current_mets["Toegangsnummer"] = current_mets["Toegangsnummer"].astype(str)
    current_mets["Aantal scans"] = current_mets["Aantal scans"].astype(str)
    current_mets["Instelling"] = current_mets["Instelling"].astype(str)
    current_mets["METS link"] = current_mets["METS link"].astype(str)

    return current_mets

def parse_page(file):

    pagens = "{http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15}"

    height = 0
    width = 0
    regions = []

    for event, elem in et.iterparse(file):

        if elem.tag == pagens + "Page":
            width = elem.attrib['imageWidth']
            height = elem.attrib['imageHeight']

        if elem.tag == pagens + "TextRegion":

            region = {
                "geo:geometry": {},
                "lines": []
            }

            for c in elem:

                if c.tag == pagens + "Coords":
                    region['geo:geometry'] = polygon(c.attrib['points'])

                if c.tag == pagens + "TextLine":
                    line = {
                        "words": []
                    }

                    for cc in c:
                        if cc.tag == pagens + "Word":
                            word = {}
                            for ccc in cc:

                                if ccc.tag == pagens + "Coords":
                                    word['geo:geometry'] = polygon(ccc.attrib['points'])

                                if ccc.tag == pagens + "TextEquiv":
                                    for cccc in ccc:
                                        if cccc.tag == pagens + "Unicode":
                                            word['original'] = cccc.text
                                            word['modernized'] = cccc.text

                            line['words'].append(word)

                    region['lines'].append(line)

            regions.append(region)

    body = {
        "@type": "Text",
        "regions": regions
    }

    return (body, height, width)

def num(s):
    try:
        return int(s)
    except ValueError:
        return float(s)

def polygon(coords):
    points = []

    for point in coords.split():
        xy = point.split(',')
        p = [num(xy[0]), num(xy[1])]
        points.append(p)

    return {
        "geo:type": "Polygon",
        "geo:coordinates": points
    }

def get_rico(identifier, tree):
    recordsets = []
    rico = { "rico:includes": recordsets }

    xpath = "//unitid[./text() = '" + identifier + "' or ./text() = '" + identifier.lower() + "']"
    for elem in tree.xpath(xpath):

        print(elem.xpath("./text()"))
        par = parents(elem)
        par.reverse()

        current_tree = None

        for parent in par:
            if parent.tag == 'ead':

                id = parent.xpath('./eadheader/eadid/text()')
                managedby = parent.xpath('./eadheader/eadid/@mainagencycode')
                publishedby = parent.xpath('./eadheader/filedesc/publicationstmt/publisher/text()')

                r = {"rico:Record": {
                        "rico:hasDocumentaryFormType": "https://www.ica.org/standards/RiC/vocabularies/documentaryFormTypes#FindingAid",
                        "rico:identifier": id[0],
                        "rico:publishedBy": publishedby[0],
                        "rico:managedBy": managedby[0]
                }}

                current_tree = r

            if parent.tag == 'archdesc':

                id = parent.xpath('./did/unitid//text()')
                title = parent.xpath('./did/unittitle//text()')
                archive = parent.xpath('./did/repository//text()')

                rs = {"rico:RecordSet": {
                        "rico:hasRecordSetType": "https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Fonds",
                        "rico:title": title[0],
                        "rico:identifier": id[0],
                        "rico:isDescribedBy": current_tree
                }}

                if len(archive) > 0:
                    rs["rico:heldBy"] = archive[0]

                current_tree = rs

            if parent.tag.startswith('c'):

                level = parent.attrib['level']

                # TODO: different ID's, different dates

                id = parent.xpath('./did/unitid//text()')
                title = parent.xpath('./did/unittitle//text()')
                date = parent.xpath('./did//unitdate/@normal')

                tree = {
                        "rico:identifier": id[0],
                        "rico:title": title[0]
                }

                if len(date) > 0 :
                    tree["rico:date"]= date[0]

                physdescn =  parent.xpath('./physdesc//text()')
                if len(physdescn) > 0:
                    tree["rico:physicalOrLogicalExtent"]= {"rico:recordResourceExtent": physdescn[0]}

                par = parent.xpath('./odd/p//text()')
                if len(par) > 0:
                    tree["html:p"]= par[0]

                if level == 'series' or level == 'subseries' or level == 'otherlevel':
                    tree["rico:hasRecordSetType"] = "https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Series"

                if level == 'file':
                    tree["rico:hasRecordSetType"] = "https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#File"

                    # mets: not extracted, as they are not part of non-na EAD's. we use the excel sheets
                    # handle ?

                tree["rico:includedIn"] = current_tree
                rs = {"rico:RecordSet": tree, }
                current_tree = rs

        recordsets.append(current_tree)

    return rico

def parents(parent):
    path = []
    while parent != None:
        path.append(parent)
        parent = parent.getparent()
    return path

# functions for json-ld -> elastic json

def elastic_doc_proc_rico(rico):
    datelist = []
    proplist = []

    for rs in rico['rico:includes']:
        (props, date) = elastic_doc_walk_rico(rs)

        if date != '':

            parts = date.split('/')

            if len(parts) == 1:
                y = parts[0][0:4]
                if y not in datelist:
                    datelist.append(y)

            if len(parts) == 2:
                y1 = parts[0][0:4]
                y2 = parts[1][0:4]

                # TODO: consecutive??

                if y1 not in datelist:
                    datelist.append(y1)

                if y2 not in datelist:
                    datelist.append(y2)

        for prop in props:
            append = True
            for i in proplist:
                if i['path'] == prop['path']:
                    append = False
                    break
            if append:
                proplist.append(prop)

    return (proplist, datelist)

def elastic_doc_walk_rico(recordset):

    ead_id = None
    props = []
    date = '' # only use the lowest level date
    while recordset != None:

        rs = recordset['rico:RecordSet']

        prop = {
            'id': rs['rico:identifier'],
            'title': rs['rico:title']
        }

        if 'rico:date' in rs:
            if date == '':
                date = rs['rico:date']

        props.append(prop)

        if 'rico:includedIn' in rs:
            recordset = rs['rico:includedIn']

        if 'rico:isDescribedBy' in rs:

            record = rs['rico:isDescribedBy']['rico:Record']
            ead_id = record['rico:identifier']

            prop = {
                'id': record['rico:managedBy'],
                'title': record['rico:publishedBy']
            }
            props.append(prop)

            recordset = None

    props.reverse()

    ids = []
    for prop in props:

        # exception: the archivenumber is located in the first level, not the second. overwrite here.
        if len(ids) == 1:
            prop['id'] = ead_id

        ids.append(prop['id'])

        # TODO quote the pipe character

        path = ""
        for id in ids:
             path = path + "|" + id

        prop['path'] = path

    return (props, date)

def elastic_doc(es, data):

    bulks = []
    page_count = 0
    bulk = ''

    document = {
        "id": "",
        "nest": []
    }

    identifier = None

    for entity in data["@graph"]:

        if entity['@type'] == 'Manifest':

            identifier = entity['@id']

            bulk += json.dumps({ "index" : { "_index" : "entity", "_id" :  identifier} }) + '\n'
            bulk += json.dumps({'entity': entity}) + '\n'

            document['id'] = entity['@id']

            (proplist, dates) = elastic_doc_proc_rico( entity['seeAlso']['rico:RecordSet'])

            print(dates)

            document['date'] = dates

            if len(proplist) > 0:

                # TODO: check if properties exist

                document['archive_title'] = proplist[0]['title']
                document['archive_id'] = proplist[0]['id']
                document['archive_label'] = document['archive_title'] + ' (' + document['archive_id'] + ')'

                document['access_title'] = proplist[1]['title']
                document['access_id'] = proplist[1]['id']
                document['access_label'] = document['access_title'] + ' - ' + document['access_id']

                document['inventory_id'] = proplist[-1]['id']

                title = ""
                lowest_title = ""
                for prop in proplist:
                    if prop['id'] == document['inventory_id']:
                        # concat the different titles from the inventory id's
                        t = prop['title'].strip()
                        if len(t) > 0:
                            if len(title.strip()) > 0:
                                title = title + " | " + t
                            else:
                                title = t
                    else:
                        # get the latest title with length > 0
                        if len(prop['title'].strip()) > 0:
                            lowest_title = prop['title'].strip()
                        # do not include the inventory property: not part of the hierarchy

                        descn = {
                            "description_path": prop['path'],
                            "description_title": prop['id'] + ' - ' + prop['title'],
                            "description_text": prop['id'] + ' - ' + prop['title']
                        }
                        document['nest'].append(descn)

                #if there is no title on the file level, use the lowest title in the hierarchy
                if len(title) == 0:
                    title = lowest_title

                print(title)

                document['inventory_title'] = title
                document['inventory_label'] = document['access_title'] + ' | ' + document['inventory_id'] + ' | ' + title

            else:
                print("RICO seems to be missing")

        if entity['@type'] == 'Canvas':
            page_id = entity['@id']

            bulk += json.dumps({ "index" : { "_index" : "entity", "_id" :  page_id} }) + '\n'
            page_count += 1

            entity["@context"] = copy.deepcopy(data["@context"])
            bulk += json.dumps({'entity': entity}) + '\n'

            page = {
                'page_id': page_id,
                'page_nr': entity['label']
            }
            original = ""
            modernized = ""

            if 'annotations' in entity:
                for annotationPage in entity['annotations']:
                    for annotation in annotationPage['items']:
                        if annotation['motivation'] == 'supplementing':
                            body = annotation['body']

                            for region in body['regions']:
                                linecount = 0
                                lines = len(region['lines'])
                                for line in region['lines']:
                                    linecount += 1

                                    if linecount < lines:
                                        if len(original) > 0:
                                            original += '\n'

                                        if len(modernized) > 0:
                                            modernized += '\n'

                                    wordcount = 0
                                    words = len(line['words'])
                                    for word in line['words']:
                                        wordcount += 1

                                        original += word['original']
                                        modernized += word['modernized']

                                        if wordcount < words:
                                            original += ' '
                                            modernized += ' '


                page['page_text'] = original
                page['page_text_modernized'] = modernized

            document['nest'].append(page)

        # 6160589

        if len(bulk) > 15000000:
            bulks.append(bulk)
            bulk = ''

    if len(bulk) + len(document) > 15000000:
        bulks.append(bulk)
        bulk = ''

    bulk += json.dumps({ "index" : { "_index" : "inventory", "_id" : identifier } }) + '\n'
    bulk += json.dumps(document) + '\n'

    bulks.append(bulk)

    len_bulks = 0
    for b in bulks:
        len_bulks += len(b)

    print ("pages: ", page_count, "bulk length: ", len_bulks, "bulks: ", len(bulks))

    for b in bulks:
        print('length of bulk: ', len(b))
        res = es.bulk(b, timeout="30s")
        if res['errors']:
            print(res)

def process_bucket(prefix, startswith = None, send_to_elastic = True, store_json_ld = False, generate_json_ld=True, save_file=False):

    # transform = True
    # save_json = False

    # send_to_elastic = True. with transform = False: send the saved json files
    # send_to_ingest = False. with transform = False: send the saved json files

    now = datetime.now()

    print(now)

    blacklist = load_blacklist('./blacklist.txt')
    blacklistcount = 0


    storage_client = storage.Client.from_service_account_json('cc.json')
    bucket = storage_client.get_bucket('transcripties')

    es = Elasticsearch([    
        ''
        ] ,http_compress = True )

    if generate_json_ld:

        current_access = None
        current_ead = None
        current_mets = None

        count = 0
        pagecount = 0

        for blob in bucket.list_blobs(prefix=prefix):
            count += 1

            parts = blob.name.split("/")

            current_archive = parts[0]

            if current_access != parts[1]:

                current_access = parts[1]

                ead_name = current_archive + '/' + current_access + '/'  + 'ead.xml'
                print(ead_name)
                current_ead = etree.parse(io.BytesIO(bucket.blob(ead_name).download_as_bytes()))

                mets_name = current_archive + '/' + current_access + '/'  + 'mets.xlsx'
                print(mets_name)
                current_mets = mets_registry(bucket.blob(mets_name).download_as_bytes())

            current_inventory = parts[2][0:-4]

            if blob.name in blacklist:
                blacklist.remove(blob.name)
                blacklistcount += 1

            if  blob.name[-4:] == '.zip' and not blob.name in blacklist and (not startswith or (startswith and blob.name == startswith)):

                startswith = None
                print(str(count) + " " + blob.name)

                archive = io.BytesIO(blob.download_as_bytes())
                json_ld = process_inventory(archive, current_archive, current_inventory, current_access, current_ead, current_mets)

                pages = len(json_ld['@graph']) - 1
                print(pages)
                pagecount += pages


                # TODO send_to_ingest
                # https://docs.python-requests.org/en/master/user/quickstart/


                if save_file:
                    data = gzip.compress(orjson.dumps(json_ld))
                    with open(current_archive + "_" + current_access + "_" + current_inventory + ".jsonld.gz" , 'wb') as outfile:
                        outfile.write(data)

                if send_to_elastic:
                    elastic_doc(es, json_ld)

                if store_json_ld:
                    json_blob = bucket.blob(current_archive + "/" + current_access + "/" + current_inventory + ".jsonld")
                    json_blob.content_encoding = 'gzip'
                    json_blob.cache_control = ''

                    json_blob.upload_from_string(gzip.compress(orjson.dumps(json_ld)), content_type='application/json')

            #print(str(datetime.now() - now))

        print('Total numer of pages: ', pagecount)
        print('blacklisted: ', blacklistcount)
        print(blacklist)


    else: # do not generate the json-ld, but fetch from the store

        # TODO multithreaded

        for blob in bucket.list_blobs(prefix=prefix):
            if blob.name[-7:] == '.jsonld' and not startswith or (startswith and blob.name == startswith) :

                print(blob.name)
                # TODO accept-encoding: gzip

                json_ld = orjson.loads(blob.download_as_string())

                if send_to_elastic:
                    elastic_doc(es, json_ld)



def load_blacklist(path):
    list = []
    f = open(path, "r")
    for line in f:
        list.append(line.strip())

    return list


process_bucket('NL-HaNA/1.04.02/7660')

#process_bucket('NL-')
#process_bucket('NL-HaNA/1.04.02/8258', send_to_elastic=True, generate_json_ld=False, store_json_ld=False)
#process_bucket('NL-HaNA/1.04.02/8607', send_to_elastic=False, store_json_ld=False)
#process_bucket('NL-HlmNHA/1617/')
#process_bucket('NL-', send_to_elastic=True, generate_json_ld=True, store_json_ld=True, startswith='NL-UtHUA/34-1/2308.zip')