---
description: Process pending design feedback from the UI
---

1. Read `feedback.json` to identify pending items.
2. For each pending item:
    a. Identify the target deck and slide.
    b. Read the slide file.
    c. Apply the requested changes.
    d. Update `feedback.json` to mark the item as "completed".
3. Notify the user of the changes.
