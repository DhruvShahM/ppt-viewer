# 🎯 Draggable Toolbar - Quick Reference

## At a Glance

```
┌─────────────────────────────────────────────────────────┐
│  ⊕ 🔄 | 🖱️ ✏️ ⭕ ⬜ ➡️ 🔤 🧹 | 🔴🔵🟢🟡⚪⚫ | 🗑️ | 🏷️ | ❌ | 🔒  │  ← HORIZONTAL
└─────────────────────────────────────────────────────────┘

┌──┐
│⊕ │
│🔄│
│──│
│🖱️│
│✏️│
│⭕│  ← VERTICAL
│⬜│
│➡️│
│🔤│
│🧹│
│──│
│🔴│
│🔵│
│🟢│
│🟡│
│⚪│
│⚫│
│──│
│🗑️│
│──│
│🏷️│
│──│
│❌│
│──│
│🔒│
└──┘
```

## 🚀 Quick Actions

| Action | How To |
|--------|--------|
| **Move Toolbar** | Click & drag toolbar background |
| **Switch Layout** | Click 🔄 rotation icon |
| **Reset Position** | Click ❌ reset button |
| **Lock Toolbar** | Click 🔒 lock icon |

## 📍 Default vs Custom Position

### Default Position
- **Location**: Bottom center
- **Orientation**: Horizontal
- **Transform**: `translateX(-50%)`

### Custom Position (After Dragging)
- **Location**: Wherever you drop it
- **Orientation**: Your choice
- **Saved**: Yes, in localStorage

## 🎨 Toolbar Icons Explained

### Control Icons
- **⊕ Move**: Drag handle indicator
- **🔄 Rotate**: Toggle horizontal ↔ vertical
- **❌ Reset**: Return to default position (only shows when moved)
- **🔒 Lock**: Hide toolbar

### Drawing Tools
- **🖱️ Cursor**: Select/move mode
- **✏️ Pencil**: Freehand drawing
- **⭕ Circle**: Draw circles/ellipses
- **⬜ Rectangle**: Draw rectangles
- **➡️ Arrow**: Draw arrows
- **🔤 Text**: Add text annotations
- **🧹 Eraser**: Remove annotations

### Other
- **🔴🔵🟢🟡⚪⚫**: Color palette
- **🗑️ Trash**: Clear all annotations on slide
- **🏷️ Stamp**: Trademark settings

## 💾 Storage Keys

```javascript
// Position
toolbar_position_${deckId}
// Example: { x: 100, y: 200 }

// Orientation  
toolbar_orientation_${deckId}
// Values: "horizontal" | "vertical"
```

## 🎯 Common Use Cases

### 1. Wide Presentation
```
Position: Right edge
Orientation: Vertical
Benefit: Maximum horizontal space
```

### 2. Standard Presentation
```
Position: Bottom center (default)
Orientation: Horizontal
Benefit: Classic layout
```

### 3. Multi-Monitor Setup
```
Position: Secondary monitor
Orientation: Based on monitor
Benefit: Keep main screen clean
```

### 4. Focused Annotation Session
```
Position: Near content area
Orientation: Vertical
Benefit: Tools always in reach
```

## ⚡ Pro Tips

1. **Drag from background**: Don't click buttons when moving
2. **Per-deck settings**: Each deck remembers its position
3. **Visual feedback**: Toolbar scales up when dragging
4. **One-click reset**: Use ❌ to restore defaults
5. **Lock when done**: Use 🔒 to hide during presentation

## 🔄 State Transitions

```
DEFAULT → Drag → CUSTOM POSITION → Reset → DEFAULT
   ↓                    ↓
Horizontal      Toggle Orientation
   ↓                    ↓
Vertical        Toggle Orientation
```

## 🎬 Workflow

```
1. Enter Presentation Mode
   ↓
2. Drag toolbar to preferred position
   ↓
3. Toggle orientation if needed
   ↓
4. Start annotating
   ↓
5. Lock toolbar when done
   ↓
6. Position saved for next time!
```

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Can't drag | Click background, not buttons |
| Position not saving | Check localStorage enabled |
| Toolbar missing | Click unlock (bottom-left) |
| Wrong orientation | Click 🔄 to toggle |

## 📊 Feature Matrix

| Feature | Status |
|---------|--------|
| Drag & Drop | ✅ |
| Horizontal Layout | ✅ |
| Vertical Layout | ✅ |
| Position Persistence | ✅ |
| Orientation Persistence | ✅ |
| Per-Deck Settings | ✅ |
| Reset to Default | ✅ |
| Visual Feedback | ✅ |
| Lock/Unlock | ✅ |

## 🎓 Learning Path

**Level 1**: Use default position  
**Level 2**: Drag to custom position  
**Level 3**: Toggle orientation  
**Level 4**: Customize per deck  
**Level 5**: Master all features  

---

**Remember**: The toolbar is YOUR workspace. Position it where YOU need it! 🎨
