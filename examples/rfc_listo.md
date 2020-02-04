
> Inspired by Riot's RFC process [here](https://technology.riotgames.com/news/tech-design-riot)

# Example RFC For - Listo Assessments (Based on SEEK's internal RFC process)

Status: DRAFT

Owner(s): Security, Architecture, Paved Road

Scope: All product development

## Problem Statement

As we expand the number of product teams at SEEK, it is difficult for product teams to keep track of all the recommended technical health practices, guidance and knowledge in the areas of Security, Performance, Recovery, Efficiency, Availability and Deployability.

Also, as an organisation we move quickly to deliver products for our customers. However, moving too quickly without considering the risks could lead to introducing security, quality or reliability issues within our products. We need to be able to move fast without introducing unnecessary or preventable risks.

### Current Challenges

+ Teams find it difficult to stay up to date with large amounts of documentation (RFCs and GitHub Wikis in our case).
+ It's hard for small enablement teams (Security, Architecture, etc) to spread their specialist knowledge as SEEK grows.
+ Product teams have many considerations to think about while building a product for our customers. This can be overwhelming and confusing.
+ Recommended information is scattered and sometimes hard to follow.
+ Guidance in all areas changes rapidly. Finding a consolidated view is hard and can get confusing when contradictory advice is given or documentation is out of date.

## Listo

Listo provides advice on security, reliability and architecture requirements when developing products at SEEK. Backed by our SEEK RFC process, this is a product team's one-stop shop to ensure its technical designs are in line with SEEK’s best practices. It also provides visibility of major product changes to enablement teams such as security and architecture, allowing them to better advise and prioritise the projects with the biggest risks to SEEK.

## Details

+ Teams *MUST* fill out a Listo assessment and [Triage the Trello board](#Triage-Trello-Board) at a minimum cadence of:
  * For every green field project [SEEK builds](#SEEK-Built-Products) before it goes live.
  * For every [major change](#major-changes) that will be added to existing [SEEK built products](#SEEK-Built-Products) before it goes live.
+ Teams *SHOULD* prioritise and create tasks based on the outcomes of the [Trello board triage process](#Triage-Trello-Board).
+ Projects rated as High Risk *SHOULD* reach out to the security team to run them through the outcomes of the [Trello board triage process](#Triage-Trello-Board).

## Definitions

### SEEK Built Products

SEEK Built Products include any web or mobile applications or services built by SEEK Group staff for external customers or SEEK employees.

### Triage Trello Board

Triaging the board is complete when:

1. The team has read through all checklists and ticked the items that have been completed for the [scope of the Listo assessment](#listo-assessment-scope).
2. Checklists that can't be completed have comments describing the considered and agreed actions. Examples of comments include:
    * The card or checklist is not relevant to our project.
    * We are working to action this card or checklist in x months.
    * We have deferred or deprioritised this task due to y and are comfortable with the risk.
    * We have completed this task by 70% and are planning to complete the rest by x. 

The triaged board should have: 
 
 1. Cards fully complete moved to the `Done` list.
 2. Cards that are not applicable moved to the `Not Applicable` list, with comments describing the reasoning.
 3. Cards that have outstanding actions moved to the `To Do` list  

### Major Changes

Introduces a significant product change or modifies significant amounts of code within an application. Examples include but are not limited to the following:

+ Adding new API endpoints and / or data stores.
+ Changing or adding infrastructure.
+ Product feature that collects new types of customer data from the frontend.
+ Adding integrations with third party businesses.

### Listo Assessment Scope

The scope of a Listo assessment and corresponding Trello Board is determined by the Project Information entered at the start of the assessment. Examples of the scope of an assessment could be:

+ A repository including the products and services deployed within it.
+ A full product that comprises of multiple repositories and systems.
+ A feature within a product that comprises of several files within a repository.
+ All products owned by a team or stream that would comprise of several repositories, systems and environments. 

## References

+ [The Checklist Manifesto: How to Get Things Right](https://www.goodreads.com/book/show/6667514-the-checklist-manifesto)
+ 
