## Situation [Given]

“Move fast and break things”, the famous Facebook motto that Mark Zuckerberg gave to his developers in 2009. In order for SEEK to move quickly in a competitive landscape, we must accept failure. The question then becomes how do we fail without exposing SEEK or our customers to unnecessary risks. We call this “failing safely.”

## Complication [But]

At SEEK we offer this safety through our collective expertise, which is concentrated in the security and architecture teams and distributed among senior developers across the organisation.

We have collated this knowledge and expertise into a set of internally documented and community approved standards, known as RFCs (Request for Comment).

However, both the architecture and security teams are vastly outnumbered by delivery teams and it is not possible to embed one of each into every team. Thus, engagement is ad hoc and often late in the software development lifecycle. RFCs are a dense collection of requirements, 80% might not apply to a project but the 20% that do are essential to failing safely.

So how do we enable developers to move fast and fail safely? More importantly, how do we achieve this as we scale our product development capabilities?

## Resolution [How]

To answer this question, we looked at the aviation and medical professions who face severe consequences as a result of failure. Both employed a very simple process to improve safety in a complex environment: checklists.

Despite the huge increase in air travel, rates of incidents and related deaths have steadily decreased since checklists were introduced in the late 1930s. Surgeon, and author of “The Checklist Manifesto,” Atul Gawande devised a simple checklist for operating theatres and introduced them across 8 hospitals. The checklists cut death rates in half and reduced related complications by 36%. Looking closer to our own industry Slack and Salesforce have published articles describing their success using checklists to improve the quality and security of their products.

Checklists, are at the heart of Listo. Listo empowers developers to perform a self-assessment that will quickly determine the relative risk of a project. The developer then selects from the full list of possible requirements, only those that apply to their project. Listo uses this information to create a Trello board with cards containing checklists for security and architecture concerns relevant to their assessment.

The current focus of Listo is security and architecture but new assessments and checklists are easily added to cover other parts of the business like compliance and governance.

So without further ado, let’s move onto a demo!
