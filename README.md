
This repository contains the source of the "zoekintranscripties.nl" project website. It consists of a search index,
webservices and frontend, and can be run without further dependencies.

## About the project

The project was developed by us as part of the "IJsberg" project between Sept 2019 and May 2021,
a national consortium led by the National Archive in the Nederlands.
The projects main output was a large-scale handwritten text recognition corpus on historical material of
VOC, WIC and notarial deeds archives. This was done by the Transcribus with it's HTR software.
Both the ground truth and HTR results can be found at https://zenodo.org/records/11209325. 
The presentation of the results (May 2021) can be found here (in Dutch): https://www.nationaalarchief.nl/beleven/nieuws/kijk-symposium-de-ijsberg-zichtbaar-maken-terug

The project started with with our (Tom Dalenberg and Robert Goené) participation in an open SBIR (small business innovation research) call for developing a prototype.
More than 50 parties pitched and we where selected among two other parties to develop a prototype in a competition for an assignment .
(https://www.tenderned.nl/aankondigingen/overzicht/171645)
During the prototype competition, we made a first version of a transcription viewer, tailored search index and trained our own Bert model on historical Dutch. The latter was a very interesing and early
experiment, but did not yield better results than an off-the-shelf model. We did not win the NER competition, but did win on the search and user interface aspects.
It was decided to split the commission: we would develop the search index and the frontend, while our former competitor would do the CMS for the transcriptions and the NER.
We worked decoupled and used our own transcription import script, as the transcription CMS project was heavily delayed. The NER results are part of the index.

The project has not been developed further since May 2021. Since that time, some of the results are developed further by the National Archive and recently the Huygens.
both with and without our involvement. The project is for us a good example of how much a small team (two part-timers) can achieve in a relative short period.

## Running the site locally

The site zoekintranscripties.nl has been discontinued in Q1 2025, but it is possible to run the site locally with little effort:

- Download and gunzip the data index: https://zenodo.org/records/14568577
- Load the index as an image: docker load --input zit-data.tar

## A short functional description

The site is basically two pages that work relatively independently: the search page and the transcription viewer.
First, the search page. There are several regular features and some less regular:





<img width="1706" alt="image" src="https://github.com/user-attachments/assets/5d0b4d30-271c-4c62-a5d7-702ad3ea81ab">

**Figure 1:** Transcriptions are indexed and shown in the search result in the context where they originate from (books or bundles), including relevant metadata.

<img width="1710" alt="image" src="https://github.com/user-attachments/assets/dd7e140b-0dc9-4eb8-8f12-443cefd9f2e3">

**Figure 2:** Search queries are parsed with an ANTLR parser and expanded with a customisable query expansion dictionary. The expanded query is sent to the search index, but more importantly: the expansions are presented to the user: a researcher can see what expansions are used and can de-select irrelevant ones.


<img width="1752" alt="image" src="https://github.com/user-attachments/assets/9a375447-ef00-4b92-a936-7e6af493a82b">

<img width="1470" alt="Scherm­afbeelding 2024-11-20 om 12 25 50" src="https://github.com/user-attachments/assets/c7b9c7eb-5a2e-439f-8db7-fa4dbd0f8244">



<img width="1470" alt="Scherm­afbeelding 2024-11-20 om 12 26 01" src="https://github.com/user-attachments/assets/d5795f4c-c932-4016-b178-3f1ef2b907c8">
