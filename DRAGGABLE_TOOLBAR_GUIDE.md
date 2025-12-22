# 🎨 Draggable Annotation Toolbar - User Guide

## Overview

The annotation toolbar is now **fully draggable** and can be positioned anywhere on the screen. It also supports both **horizontal** and **vertical** layouts, giving you complete control over your presentation workspace.

![Toolbar Features](uploaded_image_1766418434122.png)

## ✨ Key Features

### 1. **Drag & Drop** 🖱️
- Click and drag the toolbar to any position on the screen
- Position is automatically saved per deck
- Smooth dragging with visual feedback (cursor changes to "grabbing")

### 2. **Horizontal & Vertical Layouts** 🔄
- Toggle between horizontal (default) and vertical orientations
- Click the **rotation icon** (🔄) to switch layouts
- Layout preference is saved per deck

### 3. **Persistent Positioning** 💾
- Toolbar position is saved to localStorage
- Each deck remembers its own toolbar position
- Position persists across browser sessions

### 4. **Reset to Default** ↩️
- Reset button (X) appears when toolbar has been moved
- Click to return toolbar to default center-bottom position
- Removes saved position from storage

## 🎯 How to Use

### Moving the Toolbar

1. **Enter Presentation Mode** (click maximize icon)
2. **Look for the Move icon** (⊕) at the left/top of the toolbar
3. **Click and drag** anywhere on the toolbar background (not on buttons)
4. **Release** to drop the toolbar in the new position
5. Position is **automatically saved**

### Changing Orientation

1. **Click the Rotation icon** (🔄) on the toolbar
2. Toolbar switches between:
   - **Horizontal**: Tools arranged left-to-right
   - **Vertical**: Tools arranged top-to-bottom
3. Orientation is **automatically saved** per deck

### Resetting Position

1. **Move the toolbar** to any custom position
2. **Notice the X button** appears on the toolbar
3. **Click the X button** to reset to default center-bottom position
4. Saved position is cleared from storage

## 🎨 Toolbar Components

### Visual Indicators

| Icon | Purpose | Location |
|------|---------|----------|
| ⊕ | **Drag Handle** | First item - indicates toolbar is draggable |
| 🔄 | **Orientation Toggle** | Second item - switch horizontal/vertical |
| ❌ | **Reset Position** | Appears when moved - reset to default |
| 🔒 | **Lock Toolbar** | Last item - hide toolbar |

### Tool Buttons

All annotation tools remain in the same order:
- Cursor (pointer)
- Pencil
- Circle
- Rectangle
- Arrow
- Text
- Eraser

### Color Palette

6 colors available:
- 🔴 Red
- 🔵 Blue
- 🟢 Green
- 🟡 Yellow
- ⚪ White
- ⚫ Black

## 💡 Usage Tips

### Best Practices

1. **Position for Your Workflow**
   - Place toolbar on the side for wide presentations
   - Use vertical layout for narrow content
   - Keep toolbar near frequently used tools

2. **Per-Deck Customization**
   - Each deck can have its own toolbar position
   - Set up different positions for different presentation types
   - Technical decks vs. creative decks can have different layouts

3. **Presentation Mode**
   - Move toolbar to screen edge during live presentations
   - Use vertical layout to save horizontal space
   - Lock toolbar when not needed

### Keyboard-Free Operation

- All toolbar operations are mouse-based
- No keyboard shortcuts needed for repositioning
- Drag and drop is intuitive and fast

## 🔧 Technical Details

### Storage

```javascript
// Position stored per deck
localStorage key: `toolbar_position_${deckId}`
Format: { x: number, y: number }

// Orientation stored per deck  
localStorage key: `toolbar_orientation_${deckId}`
Values: 'horizontal' | 'vertical'
```

### Default Behavior

- **Default Position**: Center-bottom of screen
- **Default Orientation**: Horizontal
- **Default State**: Unlocked and visible

### Position Calculation

```javascript
// Custom position (when dragged)
left: toolbarPosition.x + 'px'
top: toolbarPosition.y + 'px'
transform: 'none'

// Default position (not dragged)
left: '50%'
bottom: '32px'
transform: 'translateX(-50%)'
```

## 🎬 Workflow Examples

### Example 1: Side Toolbar for Wide Slides

```
1. Enter presentation mode
2. Drag toolbar to right edge
3. Click rotation icon for vertical layout
4. Tools are now stacked vertically on the right
5. More horizontal space for content
```

### Example 2: Bottom Toolbar for Standard Presentations

```
1. Enter presentation mode
2. Keep default center-bottom position
3. Use horizontal layout (default)
4. Classic presentation toolbar experience
```

### Example 3: Custom Position for Multi-Monitor Setup

```
1. Enter presentation mode
2. Drag toolbar to secondary monitor
3. Choose orientation based on monitor orientation
4. Position saved for this deck
5. Next time: toolbar appears on secondary monitor
```

## 🚀 Advanced Features

### Multi-Deck Support

Each deck maintains independent toolbar settings:
- Deck A: Horizontal, bottom-center
- Deck B: Vertical, right-side
- Deck C: Horizontal, top-left

### Visual Feedback

- **Dragging**: Cursor changes to "grabbing"
- **Dragging**: Toolbar scales up (105%) with shadow
- **Hovering**: Cursor shows "grab" when over toolbar
- **Buttons**: Cursor shows "pointer" when over buttons

### Smart Positioning

- Toolbar won't start drag when clicking buttons
- Only background area triggers drag
- Prevents accidental tool activation while moving

## 🐛 Troubleshooting

### Toolbar Won't Move

**Problem**: Clicking toolbar doesn't start drag  
**Solution**: Click on the background between buttons, not on buttons themselves

### Position Not Saving

**Problem**: Toolbar returns to default on reload  
**Solution**: Check browser localStorage is enabled

### Toolbar Disappeared

**Problem**: Can't find toolbar after moving  
**Solution**: Click the unlock button (bottom-left) or reset position

### Orientation Stuck

**Problem**: Can't switch between horizontal/vertical  
**Solution**: Clear localStorage for the deck and reload

## 📊 Comparison: Before vs After

| Feature | Before | After |
|---------|--------|-------|
| Position | Fixed center-bottom | Draggable anywhere |
| Orientation | Horizontal only | Horizontal + Vertical |
| Persistence | None | Saved per deck |
| Customization | None | Full control |
| Reset | N/A | One-click reset |

## 🎓 Learning Curve

- **Beginner**: Use default position (no learning needed)
- **Intermediate**: Drag to preferred position
- **Advanced**: Customize per deck with orientation toggle

## 🌟 Benefits

1. **Flexibility**: Position toolbar where you need it
2. **Efficiency**: Tools always in reach
3. **Customization**: Different setups for different decks
4. **Persistence**: Settings saved automatically
5. **Simplicity**: Intuitive drag-and-drop interface

---

**Enjoy your fully customizable annotation toolbar!** 🎉

For technical implementation details, see the code in `PresentationViewer.jsx`.
