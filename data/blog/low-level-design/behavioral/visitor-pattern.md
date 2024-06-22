---
title: 'Visitor Pattern'
date: '2024-06-06'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Visitor Pattern: Adding new operations to complex structures without modifying existing classes.'
authors: ['default']
type: 'Blog'
images: []
---

A behavioural design pattern called the Visitor pattern lets you extend the functionality of a collection of related objects without changing their classes. When working with intricate object structures and needing to execute different, unrelated operations over them, this technique comes in handy. The Visitor design encourages the Open/Closed Principle by isolating the actions from the objects, making it simple to add new functionality to the system.

## Current Problem

Many software systems, particularly those with intricate object hierarchies, require that these objects be subjected to a variety of different processes. The Single Responsibility Principle may be broken and bloated classes may result from implementing these operations directly within the objects. Furthermore, it is frequently necessary to modify the current classes in order to add new operations, which is not the best way to preserve the flexibility and extensibility of the code.

## Solution through Visitor Pattern

These problems are resolved by the Visitor pattern, which externalises the operations into a distinct visitor object. The visitor represents each operation as a method, and the elements—the objects being operated on—accept the visitor and provide it permission to carry out the operation. In this manner, adding new actions just requires establishing new visitors—no need to modify the element classes. Because actions are separated from the object structure, maintainability and extensibility are encouraged.

## Real-World Applications

Consider a document editor application where various elements like text, images, and tables need to be processed for different operations such as rendering, exporting, and spell-checking.

1. **Separate Operations**: Different operations (rendering, exporting, spell-checking) are implemented as separate visitor classes.
2. **Complex Object Structure**: The document is composed of various elements (text, images, tables).
3. **Extensibility**: New operations can be added by introducing new visitor classes without modifying the element classes.

## Structure

The Visitor pattern typically includes the following components:

1. **Visitor**: Declares a visit method for each type of element.
2. **ConcreteVisitor**: Implements the operations to be performed on elements.
3. **Element**: Declares an accept method that takes a visitor as an argument.
4. **ConcreteElement**: Implements the accept method, typically by calling the appropriate visit method on the visitor.

## Real-World Example with Code Snippet

Let's implement an example where different types of elements (e.g., Text, Image) in a document are visited by different operations (e.g., rendering, exporting):

```Java
// Visitor Interface
interface Visitor {
    void visit(Text text);
    void visit(Image image);
}

// ConcreteVisitor for rendering
class RenderVisitor implements Visitor {
    @Override
    public void visit(Text text) {
        System.out.println("Rendering text: " + text.getContent());
    }

    @Override
    public void visit(Image image) {
        System.out.println("Rendering image with URL: " + image.getUrl());
    }
}

// Element Interface
interface Element {
    void accept(Visitor visitor);
}

// ConcreteElement for Text
class Text implements Element {
    private String content;

    public Text(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// ConcreteElement for Image
class Image implements Element {
    private String url;

    public Image(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        Element[] elements = new Element[] {
            new Text("Hello, world!"),
            new Image("http://example.com/image.png")
        };

        Visitor renderVisitor = new RenderVisitor();
        for (Element element : elements) {
            element.accept(renderVisitor);
        }
    }
}
```

## Pros and cons

### Pros:

1. Promotes the Open/Closed Principle by allowing new operations to be added without modifying existing classes.
2. Separates concerns by externalizing operations, leading to cleaner and more maintainable code.
3. Simplifies adding new operations as they are centralized in visitor classes.

### Cons:

1. Can make the system more complex by adding multiple visitor and accept methods.
2. Requires updating all visitor classes if a new type of element is added.
3. Might be less efficient if the visitor needs to traverse a complex object structure frequently.

## Conclusion

Without changing the objects themselves, the Visitor pattern provides a potent method for adding new actions to intricate object structures. Maintainability and extensibility are improved by the pattern by externalising the operations into distinct visitor classes. The advantages of advocating for the Open/Closed Principle and segregating concerns frequently exceed the disadvantages, despite the fact that it adds some complexity.