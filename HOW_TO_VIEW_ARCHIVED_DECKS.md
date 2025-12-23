# How to View Archived Decks

## Problem
Archived decks are not showing in the list page.

## Solution
You need to **switch to the Archived view** using the Archive toggle button.

## Steps

### 1. Look at the Toolbar
In the top section of the Deck Selector page, you'll see several buttons:
- Search box
- A-Z sort button
- Edit Structure button
- Import button
- Prompts button
- **📦 Archive button** ← THIS ONE!
- Feedback button
- Select button

### 2. Click the Archive Button
The Archive button (📦 icon) toggles between two views:
- **Active view** (default) - Shows only active decks
- **Archived view** - Shows only archived decks

### 3. Visual Indicator
When you click the Archive button:
- **Active view**: Button is gray/white
- **Archived view**: Button turns **ORANGE** 🟧

### 4. What You'll See
After clicking the Archive button:
- All your archived decks will appear
- They will have a grayscale/dimmed appearance
- Each card will show "ARCHIVED" label
- You can restore them using the "Restore" button in Edit mode

## Code Reference

The toggle button is on line 1071-1084 of `DeckSelector.jsx`:

```javascript
<button
    onClick={() => {
        setViewMode(viewMode === 'active' ? 'archived' : 'active');
        setIsSelectionMode(false);
        setSelectedDecks(new Set());
    }}
    className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
        viewMode === 'archived'
            ? 'bg-orange-500/20 border-orange-500 text-orange-400'
            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
    }`}
    title={viewMode === 'active' ? "View Archived" : "View Active"}
>
    <Archive size={20} />
</button>
```

## Filtering Logic

The filtering happens on lines 221-222:

```javascript
decks: repo.decks.filter(deck =>
    (deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    ((viewMode === 'active' && deck.status !== 'archived') ||
     (viewMode === 'archived' && deck.status === 'archived'))
)
```

This means:
- **Active view**: Shows decks where `status !== 'archived'`
- **Archived view**: Shows decks where `status === 'archived'`

## Quick Actions in Archived View

Once you're viewing archived decks, you can:

1. **Restore individual decks**:
   - Click "Edit Structure" button
   - Click the "Restore" button (↻ icon) on any archived deck

2. **Restore multiple decks**:
   - Click "Select" button
   - Select the decks you want to restore
   - Click "Restore (X)" button in the toolbar

3. **Delete archived decks**:
   - Click "Select" button
   - Select the decks you want to delete
   - Click "Delete (X)" button in the toolbar

## Summary

✅ **Archived decks ARE in your system**  
✅ **They're just hidden in the Active view**  
✅ **Click the Archive button (📦) to see them**  
✅ **The button will turn orange when viewing archives**  

---

**TL;DR**: Click the 📦 Archive button in the toolbar to toggle between Active and Archived views!
