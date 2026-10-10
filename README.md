# vehicle-requirements-ai
AI-assisted vehicle requirements planning: turn customer feedback and market evidence into prioritized proposals with linked sources, product manager review, and a decision audit trail.

## Project plan

[Full product, architecture, and hackathon implementation plan](doc/BMW_AI_Requirements_Full_Plan.md)

The plan covers eight solution approaches, a reusable vehicle and market strategy, the complete evidence-to-decision pipeline, prioritization, PM review, audit history, four implementation phases, synthetic sample requirements, and a six-minute demonstration script.

## Frontend preview

The local React frontend is in [frontend/](frontend/README.md). Run `npm ci` and `npm run dev` from that directory. It opens with a continuous BMW 360-degree scroll journey and a 24-entry F70/G60/G68/G70 collection, then leads into the requirements workspace. Analysis currently uses the shared synthetic contract fixtures; live backend integration is not yet connected.
