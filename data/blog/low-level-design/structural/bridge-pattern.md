---
title: 'Bridge Pattern'
date: '2024-03-14'
tags: ['System Design', 'Low Level Design', 'LLD']
draft: false
summary: 'Spanning the Divide: The Bridge Pattern for Flexible and Independent Design.'
authors: ['default']
type: 'Blog'
images: []
---

The Bridge Pattern is a structural design pattern that separates abstraction and implementation, allowing them to change independently. It encourages a cleaner, more flexible architecture, making future updates and extensions to the abstraction and implementation levels simpler.

## Current Problem

In software engineering, strong coupling between components can result in inflexible code that is difficult to maintain and extend. For example, if a system's abstraction has several versions, each requiring a unique set of implementations, managing all combinations can become complex and time-consuming.

## Solution through Bridge Pattern

The Bridge Pattern solves this problem by bridging the gap between abstraction and implementation. It allows the concept and implementation to evolve independently using composition and interface delegation. This split helps to reduce the number of subclasses, making the code more modular and easier to understand.

## Real-World Applications

1. **User Interface Frameworks**: Provide a common interface control layer (such as buttons or sliders) that may be used with a variety of underlying graphical systems or platforms (such as Windows, macOS, and Linux) without tying the UI components to specific platform characteristics.
2. **Database Connectivity**: By abstracting database interactions from individual database implementations, the application can support several databases (SQL and NoSQL) without modifying its logic.
3. **Remote Service Connectors**: Enabling connections to various types of network services or APIs while providing a uniform interface for the application to use, regardless of service specifics.

## Structure

The key components in the Bridge Pattern include:

1. **Abstraction**: Defines the abstraction's interface and keeps track of an Implementor-type object.
2. **Refined Abstraction** extends or expands the interface defined by Abstraction.
3. **Implementors** define the interface for implementation classes.
4. **ConcreteImplementor**: Implements the Implementor interface and specifies its concrete implementation.

## Real-World Example with Code Snippet

Imagine a scenario where you need to draw shapes in different rendering modes:

```Java
// Implementor
interface Renderer {
    void renderCircle(float radius);
}

// ConcreteImplementors
class VectorRenderer implements Renderer {
    public void renderCircle(float radius) {
        System.out.println("Drawing a circle of radius " + radius + " with vector renderer");
    }
}

class RasterRenderer implements Renderer {
    public void renderCircle(float radius) {
        System.out.println("Drawing pixels for a circle of radius " + radius + " with raster renderer");
    }
}

// Abstraction
abstract class Shape {
    protected Renderer renderer;

    public Shape(Renderer renderer) {
        this.renderer = renderer;
    }

    public abstract void draw();
    public abstract void resize(float factor);
}

// RefinedAbstraction
class Circle extends Shape {
    private float radius;

    public Circle(Renderer renderer, float radius) {
        super(renderer);
        this.radius = radius;
    }

    public void draw() {
        renderer.renderCircle(radius);
    }

    public void resize(float factor) {
        radius *= factor;
    }
}
```

```Java
// Main class
public class Main {
    public static void main(String[] args) {
        Shape vectorCircle = new Circle(new VectorRenderer(), 5);
        vectorCircle.draw();

        Shape rasterCircle = new Circle(new RasterRenderer(), 5);
        rasterCircle.draw();
    }
}
```

This example demonstrates how you can render a circle using different rendering methods (vector or raster) without changing the circle's code, adhering to the Bridge pattern principles.

## Pros and cons

### Pros:

1. Decouples an abstraction from its implementation, allowing it to change independently.
2. Encourages greater code organisation and extensibility.
3. Simplifies codebase maintenance by separating platform-specific code from high-level abstractions.

### Cons:

1. The addition of extra classes and interfaces may increase code complexity.
2. The initial architecture may be more difficult to understand and implement due to its abstract nature.

## Conclusion

The Bridge Pattern provides a strong approach for increasing the modularity of your code, making it easier to understand, maintain, and extend. It fosters decoupling, which helps prevent complex dependencies, particularly in systems where abstraction and implementation can vary separately.
