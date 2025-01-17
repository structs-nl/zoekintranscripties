
This repository contains the source of the "zoekintranscripties.nl" project site. It consists of a search index,
webservices and frontend, and can be run locally without further dependencies.

## About the project

The project was developed by us as part of the "IJsberg" project between Sept 2019 and May 2021,
a national consortium led by the National Archive in the Nederland with a large handwritten text recognition corpus of
VOC, WIC and notarial deeds archives as it's [main output](https://zenodo.org/records/11209325). The HTR was done by Transcribus.

Our project started with our pitch as response to an [open SBIR call](https://www.tenderned.nl/aankondigingen/overzicht/171645).
More than 50 parties pitched and we where selected among two other parties to develop a prototype in a competition for an assignment.
During the prototype competition, we made a first version of a transcription viewer, tailored search index and trained our own Bert model on historical Dutch, with Google TPU's. The latter was a very interesting experiment with this type of model, but did not yield better results than an off-the-shelf model. Our search and user interface aspects where appreciated and we where granted  a commission for the development of the search index, the user interface and linked data. The NER was comissioned to one of the other participants.

The source has not been developed further since May 2021. Since that time, some of the results are developed further by the National Archive and recently the Huygens. both with and without our involvement.

## Running the site locally

The site zoekintranscripties.nl has been discontinued in Q1 2025, but it is possible to run the site locally with little effort:

- Download the data index: https://zenodo.org/records/14568577
- Load the index as an image: docker load --input zit-data.tar.gz
- Run docker compose up in this cloned git repos

## A short functional description

The site is basically two pages that work relatively independently: the search page and the transcription viewer.

<img width="750" alt="image" src="https://github.com/user-attachments/assets/5d0b4d30-271c-4c62-a5d7-702ad3ea81ab">

**Screen 1 (search page):** Transcriptions are indexed and shown in the search result in the context where they originate from (books or bundles), including relevant metadata.

<img width="750" alt="image" src="https://github.com/user-attachments/assets/dd7e140b-0dc9-4eb8-8f12-443cefd9f2e3">

**Screen 2 (search page):** Search queries are parsed with an ANTLR parser and expanded with a customisable query expansion dictionary. The expanded query is sent to the search index, but more importantly: the expansions are presented to the user: a researcher can see what expansions are used and can de-select irrelevant ones.

<img width="750" alt="image" src="https://github.com/user-attachments/assets/9a375447-ef00-4b92-a936-7e6af493a82b">

**Screen 3 (search page):** A hierarchical facet that allows browsing and filtering on the descriptive hierarchies of the works. This was done with a decomposition of the hierarchies in path / value pairs and regular expression filters on the standard term aggregate.

<img width="750" alt="Scherm­afbeelding 2024-11-20 om 12 25 50" src="https://github.com/user-attachments/assets/c7b9c7eb-5a2e-439f-8db7-fa4dbd0f8244">

**Screen 3 (transcription viewer):** The scan viewer with search support and term highlighting.

<img width="750" alt="Scherm­afbeelding 2024-11-20 om 12 26 01" src="https://github.com/user-attachments/assets/d5795f4c-c932-4016-b178-3f1ef2b907c8">

**Screen 4 (transcription viewer):** The scan + transcription viewer, with search support and mouseover on both the words in the scan and the words in the text.
