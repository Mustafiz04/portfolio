---
title: 'Memento Pattern'
date: '2024-05-31'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Memento Pattern: Encapsulating state for undoable and restorable operations in software systems.'
authors: ['default']
type: 'Blog'
images: []
---

An object can save its state and restore it at a later time without breaking encapsulation thanks to the Memento pattern, a behavioural design pattern. When you need to provide undo/redo capability or return an item to its initial state, this pattern comes in handy. The Memento pattern preserves encapsulation and integrity by externalising an object's state and preventing its internal details from being revealed.

## Current Problem

Objects in complex software systems frequently experience modifications that may need to be reversed or returned to their original state. If this capability is implemented directly, encapsulation may be violated and tightly linked code may result from exposing an object's internal state. The system can also get complicated by handling state changes and offering undo/redo functionality, which can become laborious and prone to errors.

## Solution through Memento Pattern

These problems are resolved by the Memento pattern, which stores an object's state in a distinct memento object. A memento holding its state is created by the original object, whose state needs to be saved. The memento is stored by the caretaker object, which must carry out the undo/redo procedures. By keeping concerns apart, it is possible to restore the originator's internal state without jeopardising encapsulation.

## Real-World Applications

Consider a text editor application where users can type text, format it, and undo or redo their actions.

1. **State Management**: The text editor's state (e.g., the current text content, formatting) is captured in a memento.
2. **Undo/Redo Functionality**: Users can undo or redo their actions by restoring the text editor's state from the memento.
3. **Encapsulation**: The internal state of the text editor is not exposed, ensuring data integrity and encapsulation.


## Structure

The Memento pattern typically includes the following components:

1. **Memento**: Stores the internal state of the Originator object.
2. **Originator**: Creates a memento containing a snapshot of its current state and uses the memento to restore its state.
3. **Caretaker**: Responsible for storing and managing mementos, typically for undo/redo functionality.

## Real-World Example with Code Snippet

Let's implement an example where a text editor uses the Memento pattern to provide undo functionality:

```Java
// Memento
class TextMemento {
    private final String state;

    public TextMemento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

// Originator
class TextEditor {
    private String text;

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public TextMemento save() {
        return new TextMemento(text);
    }

    public void restore(TextMemento memento) {
        text = memento.getState();
    }
}

// Caretaker
class TextEditorHistory {
    private final Stack<TextMemento> history = new Stack<>();

    public void save(TextEditor editor) {
        history.push(editor.save());
    }

    public void undo(TextEditor editor) {
        if (!history.isEmpty()) {
            editor.restore(history.pop());
        }
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        TextEditorHistory history = new TextEditorHistory();

        editor.setText("Version 1");
        history.save(editor);
        System.out.println("Text: " + editor.getText());

        editor.setText("Version 2");
        history.save(editor);
        System.out.println("Text: " + editor.getText());

        editor.setText("Version 3");
        System.out.println("Text: " + editor.getText());

        history.undo(editor);
        System.out.println("Undo: " + editor.getText());

        history.undo(editor);
        System.out.println("Undo: " + editor.getText());
    }
}
```

## Pros and cons

### Pros:

1. Preserves encapsulation by not exposing the internal state of the object.
2. Simplifies the implementation of undo/redo functionality.
3. Decouples state management from the main business logic.

### Cons:

1. Can consume a significant amount of memory if mementos are created frequently or if the state is large.
2. The caretaker must manage the lifecycle of mementos, which can add complexity.

## Conclusion

An effective method for maintaining object state while maintaining encapsulation and streamlining undo/redo capabilities is the Memento pattern. It keeps the integrity of the object's internal state and isolates problems by externalising state storage. Even while there are certain compromises, including possible memory use, the advantages of clear, maintainable code frequently exceed these disadvantages.