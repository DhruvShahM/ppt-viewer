# 🎨 Annotation Quick Reference

## Keyboard Shortcuts & Controls

### Navigation
- **Arrow Right / Space**: Next slide (auto-saves annotations)
- **Arrow Left**: Previous slide (auto-saves annotations)
- **Escape**: Exit presentation mode

### Tools (Available in Presentation Mode)

| Icon | Tool | Action | Tip |
|------|------|--------|-----|
| 🖱️ | **Cursor** | Select & move annotations | Click and drag any text or shape |
| ✏️ | **Pencil** | Draw freehand | Click and drag to draw |
| ⭕ | **Circle** | Draw circles/ellipses | Click and drag to size |
| ⬜ | **Rectangle** | Draw rectangles | Click and drag to size |
| ➡️ | **Arrow** | Draw arrows | Click start, drag to end |
| 🔤 | **Text** | Add text annotations | Click to place, type, press Enter |
| 🧹 | **Eraser** | Erase annotations | Drag over annotations to remove |

### Color Palette
- 🔴 Red (#ef4444)
- 🔵 Blue (#3b82f6)
- 🟢 Green (#22c55e)
- 🟡 Yellow (#eab308)
- ⚪ White (#ffffff)
- ⚫ Black (#000000)

## 🎯 Feature Guide

### Moving Annotations

#### Text
1. Select **Cursor** tool or **Text** tool
2. Click and drag the text
3. **Double-click** to rotate (0° → 90° → 180° → 270°)

#### Shapes
1. Select **Cursor** tool
2. Click on any shape (rectangle, circle, arrow)
3. Drag to new position

### Rotation
- **Text only**: Double-click any text annotation
- Cycles through: Horizontal → Vertical Right → Upside Down → Vertical Left
- Rotation is saved with the annotation

### Clearing Annotations
- Click **Trash** icon to clear all annotations on current slide
- Annotations on other slides are preserved
- Cleared annotations are removed from storage

### Locking/Unlocking
- **Lock** icon: Hide toolbar during presentation
- **Unlock** icon (bottom-left): Show toolbar again

## 💾 Persistence

### What Gets Saved
✅ Text content and position  
✅ Text rotation angle  
✅ All shapes (rectangles, circles, arrows)  
✅ Shape positions and colors  
✅ Canvas drawings (pencil strokes)  

### When Annotations Are Saved
- Automatically when switching slides
- When navigating with arrow keys
- When clicking on the progress bar
- Stored in browser localStorage

### Storage Location
```
localStorage key: annotations_${deckId}
```

Each deck has independent annotation storage.

## 🔧 Troubleshooting

### Annotations Not Saving?
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing browser cache and reloading

### Can't Move Shapes?
- Make sure you're in **Cursor** mode (pointer icon)
- Click directly on the shape outline
- Try clicking in the center of the shape

### Text Won't Rotate?
- **Double-click** (not single click)
- Only works on committed text (not while typing)
- Rotation is instant with smooth animation

## 📱 Best Practices

1. **Create First, Move Later**: Draw all annotations, then switch to Cursor to arrange
2. **Use Rotation Wisely**: Vertical text works great for labels and side notes
3. **Lock When Presenting**: Prevent accidental toolbar clicks during live presentations
4. **Color Code**: Use consistent colors for different types of annotations
5. **Test Persistence**: Navigate away and back to verify annotations saved

## 🎬 Workflow Example

```
1. Enter Presentation Mode (Maximize icon)
2. Select Rectangle tool
3. Draw a box around important content
4. Select Text tool
5. Click inside box, type "Important!"
6. Double-click text to rotate if needed
7. Select Cursor tool
8. Adjust positions as needed
9. Lock toolbar
10. Present with confidence! 🎉
```

## 🚀 Advanced Tips

- **Layering**: Newer annotations appear on top
- **Precision**: Use small mouse movements for fine adjustments
- **Consistency**: Stick to 2-3 colors for professional look
- **Backup**: Annotations are in localStorage - export if needed
- **Performance**: No limit on annotations, but keep it reasonable

---

**Need Help?** Check `ANNOTATION_ENHANCEMENTS.md` for technical details.
