---
title: 'Flyweight Pattern'
date: '2024-04-11'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Structural Design Pattern']
draft: false
summary: 'Optimize memory usage and improve performance with the Flyweight Pattern.'
authors: ['default']
type: 'Blog'
images: []
---

In software engineering, the Flyweight Pattern is a structural design pattern that tries to reduce memory usage and increase efficiency by sharing object instances between contexts. It accomplishes this by distinguishing between intrinsic and extrinsic states, allowing objects to be distributed more effectively.

## Current Problem

When working with large-scale applications or systems that require a high number of objects, memory consumption might be an issue. Creating and managing a large number of similar objects might result in excessive memory utilisation and poor efficiency. This issue is especially noticeable when several objects share common attributes or when the same object state is frequently created.

## Solution through Flyweight Pattern

The Flyweight Pattern solves this problem by separating the intrinsic state (shared by several objects) from the extrinsic state (unique to each object). It enables objects to share a common state, lowering memory consumption by avoiding repeated storage of shared data. The Flyweight Pattern increases memory usage and efficiency by sharing state and only storing unique data.

## Real-World Applications

Consider a text editing application where each character in a document is represented by an object. Each character object contains intrinsic state (e.g., font, size, color) and extrinsic state (e.g., position within the document). However, many characters may share common intrinsic state (e.g., default font and size). By applying the Flyweight Pattern, the application can optimize memory usage by sharing instances of character objects with common intrinsic state.

## Structure

The Flyweight Pattern is often made up of the following components:

1. **Flyweight Interface**: Declares methods for managing shared state among flyweight objects.
2. **Concrete Flyweight**: Implements the flyweight interface and stores intrinsic state shared among flyweight objects.
3. **Flyweight Factory**: Creates and manages flyweight objects, ensuring that shared flyweights are reused when possible.
4. **Client**: Utilizes flyweight objects and optionally stores extrinsic state.

## Real-World Example with Code Snippet

Let's illustrate the Flyweight Pattern with a simplified example of a text editing application:

```Java
// Flyweight interface
interface Character {
    void display(int position);
}

// Concrete flyweight class
class CharacterImpl implements Character {
    private char symbol;

    CharacterImpl(char symbol) {
        this.symbol = symbol;
    }

    @Override
    public void display(int position) {
        System.out.println("Character at position " + position + ": " + symbol);
    }
}

// Flyweight factory
class CharacterFactory {
    private Map<Character, CharacterImpl> characters = new HashMap<>();

    Character getCharacter(char symbol) {
        CharacterImpl character = characters.get(symbol);
        if (character == null) {
            character = new CharacterImpl(symbol);
            characters.put(symbol, character);
        }
        return character;
    }
}
```

```Java
// Client code
public class Main {
    public static void main(String[] args) {
        String document = "Hello, world!";
        CharacterFactory factory = new CharacterFactory();

        for (int i = 0; i < document.length(); i++) {
            char symbol = document.charAt(i);
            Character character = factory.getCharacter(symbol);
            character.display(i);
        }
    }
}
```

## Pros and cons

### Pros:

1. **Memory Efficiency**: Reduces memory consumption by sharing common state among multiple objects.
2. **Performance Improvement**: Improves performance by reducing the number of object instances and memory allocations.
3. **Simplicity**: Simplifies code by separating intrinsic and extrinsic state, leading to cleaner and more modular designs.

### Cons:

1. **Complexity**: Introduces additional complexity, especially in managing shared state and ensuring thread safety in multithreaded environments.
2. **Potential Overhead**: The overhead of managing flyweight objects and the flyweight factory may outweigh the benefits for small-scale applications.

## Conclusion

The Flyweight Pattern is an effective approach for optimising memory usage and improving speed in applications that handle a large number of similar items. It allows for effective memory management and improves overall system efficiency by sharing common state while segregating intrinsic and extrinsic state.
