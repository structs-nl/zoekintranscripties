import 'jasmine';
import { RicoRecordSet } from './model';
import transform from './transform-rico';

const mock: RicoRecordSet = {
  'rico:includes': [
    {
      'rico:RecordSet': {
        'rico:hasRecordSetType':
          'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#File',
        'rico:identifier': '7660',
        'rico:date': '1682-03-06/1683-01-10',
        'rico:title':
          'Kopie-dagelijkse aantekeningen gehouden door Davidt de Vicq, secretaris van de commandant van Bantam, en Isaac de Saint Martin',
        'rico:includedIn': {
          'rico:RecordSet': {
            'rico:hasRecordSetType':
              'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Series',
            'rico:identifier': 'div.nrs.',
            'rico:date': '1681 - 1782 [1789]',
            'rico:title':
              'Kopie-missiven en -rapporten ingekomen bij gouverneur-generaal en raden uit Bantam. Met bijlagen',
            'rico:includedIn': {
              'rico:RecordSet': {
                'rico:hasRecordSetType':
                  'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Series',
                'rico:title': 'Bantam',
                'rico:identifier': 'Deel II/E.5.02',
                'rico:includedIn': {
                  'rico:RecordSet': {
                    'rico:hasRecordSetType':
                      'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Series',
                    'rico:title':
                      'Kopie-missiven en -rapporten ingekomen bij  gouverneur-generaal en raden van de kantoren in Indië',
                    'rico:identifier': 'Deel II/E.5',
                    'html:p':
                      "Van ieder kantoor zijn eerst de reeksen kopie-missiven en  -rapporten met bijlagen opgenomen. Dikwijls zijn echter ook van de bijlagen  aparte reeksen gevormd. Dit is weinig consequent geschied en het is daardoor  mogelijk dat stukken die in zo'n reeks bijlagen ontbreken, terug te vinden zijn  in de reeks kopie-missiven en -rapporten met bijlagen. Met name bij stukken van  na omstreeks 1769 is dit het geval. De oorspronkelijke opzet van de  administratie van de kamer Zeeland was blijkbaar de overgekomen brieven en  papieren uit Indië geografisch te ordenen en in één band alleen de  kopie-missiven van één zelfde kantoor op te nemen. Ook dit systeem is echter  verre van consequent volgehouden. Talloze delen bevatten geheel willekeurig  stukken van verschillende kantoren. Indien een band kopie-missiven uit twee of  meer kantoren bevat, wordt deze band bij dat kantoor vermeld waarvan de stukken  het grootste gedeelte van de band innemen, met vermelding van de missiven van  andere kantoren. Verwijzing naar banden in andere reeksen vindt plaats door  middel van een blanco inventarisnummer (----). Bij de rangschikking van de  kantoren is afgeweken van de door de kamer toegepaste volgorde en is die uit de  generale missiven van gouverneur-generaal en raden aangehouden",
                    'rico:includedIn': {
                      'rico:RecordSet': {
                        'rico:hasRecordSetType':
                          'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Series',
                        'rico:title':
                          'INGEKOMEN STUKKEN VAN GOUVERNEUR-GENERAAL EN RADEN BIJ   DE HEREN XVII EN DE KAMER ZEELAND',
                        'rico:identifier': 'Deel II/E',
                        'html:p': 'Voor een toelichting zie hoofdstuk 3, p. .',
                        'rico:includedIn': {
                          'rico:RecordSet': {
                            'rico:hasRecordSetType':
                              'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Series',
                            'rico:title': 'Kamer Zeeland',
                            'rico:identifier': 'Deel II',
                            'rico:includedIn': {
                              'rico:RecordSet': {
                                'rico:hasRecordSetType':
                                  'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#Fonds',
                                'rico:title':
                                  'Verenigde Oostindische Compagnie (VOC)',
                                'rico:identifier': '152',
                                'rico:heldBy': 'NL-HaNA',
                                'rico:isDescribedBy': {
                                  'rico:Record': {
                                    'rico:hasDocumentaryFormType':
                                      'https://www.ica.org/standards/RiC/vocabularies/documentaryFormTypes#FindingAid',
                                    'rico:identifier': '1.04.02',
                                    'rico:publishedBy':
                                      'Nationaal Archief, Den Haag',
                                    'rico:managedBy': 'NL-HaNA',
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  ],
};

describe('Transform Rico', () => {
  it('transforms correctly', () => {
    const expected = {
      propList: [
        {
          id: 'NL-HaNA',
          title: 'Nationaal Archief, Den Haag',
          path: '|NL-HaNA',
        },
        {
          id: '1.04.02',
          title: 'Verenigde Oostindische Compagnie (VOC)',
          path: '|NL-HaNA|1.04.02',
        },
        {
          id: 'Deel II',
          title: 'Kamer Zeeland',
          path: '|NL-HaNA|1.04.02|Deel II',
        },
        {
          id: 'Deel II/E',
          title:
            'INGEKOMEN STUKKEN VAN GOUVERNEUR-GENERAAL EN RADEN BIJ   DE HEREN XVII EN DE KAMER ZEELAND',
          path: '|NL-HaNA|1.04.02|Deel II|Deel II/E',
        },
        {
          id: 'Deel II/E.5',
          title:
            'Kopie-missiven en -rapporten ingekomen bij  gouverneur-generaal en raden van de kantoren in Indië',
          path: '|NL-HaNA|1.04.02|Deel II|Deel II/E|Deel II/E.5',
        },
        {
          id: 'Deel II/E.5.02',
          title: 'Bantam',
          path: '|NL-HaNA|1.04.02|Deel II|Deel II/E|Deel II/E.5|Deel II/E.5.02',
        },
        {
          id: 'div.nrs.',
          title:
            'Kopie-missiven en -rapporten ingekomen bij gouverneur-generaal en raden uit Bantam. Met bijlagen',
          path:
            '|NL-HaNA|1.04.02|Deel II|Deel II/E|Deel II/E.5|Deel II/E.5.02|div.nrs.',
        },
        {
          id: '7660',
          title:
            'Kopie-dagelijkse aantekeningen gehouden door Davidt de Vicq, secretaris van de commandant van Bantam, en Isaac de Saint Martin',
          path:
            '|NL-HaNA|1.04.02|Deel II|Deel II/E|Deel II/E.5|Deel II/E.5.02|div.nrs.|7660',
        },
      ],
      dateList: [1682, 1683],
    };

    expect(transform(mock)).toEqual(expected);
  });
});
