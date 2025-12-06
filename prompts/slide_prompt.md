Act as an expert frontend developer and motion designer. I need you to create a new presentation deck for my React-based slides application.

**Topic:** [INSERT TOPIC HERE, e.g., "Kafka Architecture" or "Rust Memory Safety"]
**Target Folder:** src/decks/[insert-topic-slug]

## Technical Constraints
*   **Framework:** React (Functional Components)
*   **Styling:** Tailwind CSS (Use a modern, dark-themed palette like slate/zinc with colorful accents)
*   **Animations:** Framer Motion (Essential: Use for slide transitions, element entrance, and *especially* for moving diagrams)
*   **Icons:** Lucide React

## Deliverables
Create [NUMBER] slides. Each slide should be a separate file named `Slide[N]_[Name].jsx`.

1.  **Slide 1: Title Slide**: Big bold typography, animated background or subtle motion graphic.
2.  **Slide 2: Concept/Diagram**: This is the most important slide. Use Framer Motion to clearly visualize the concept (e.g., if the topic is "Kafka", animate messages moving from Producer to Topic to Consumer). Do NOT use static images; build the diagram with code (divs, SVGs, motion.div).
3.  **Slide 3: Code/Details**: A slide showing key points or a code snippet relevant to the topic.

## Code Requirements
*   Export each component as `default`.
*   Ensure animations repeat or loop smoothly if they illustrate a continuous process.
*   Make sure the layout is responsive but optimized for 16:9 presentation.