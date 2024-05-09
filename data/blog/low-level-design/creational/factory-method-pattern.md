---
title: 'Factory Method Pattern'
date: '2024-03-09'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Creational Design Pattern']
draft: false
summary: 'Empowering Object Creation: The Factory Method Pattern for Dynamic and Scalable System Design.'
authors: ['default']
type: 'Blog'
---

The Factory Method Design Pattern is a cornerstone in the realm of software design, exemplifying the notion of making objects without specifying the particular class of item to be created. This pattern belongs to a wider family of creational patterns that focus on object creation methods with the goal of increasing code flexibility and reusability.

## Current Problem

Developers frequently confront the difficulty of extending existing systems or adding new functionality while preserving the present code structure. A big element of this challenge is the direct instantiation of objects within the client classes, which results in a closely connected system that is difficult to extend, maintain, or test, and is prone to frequent updates anytime the underlying classes change.

## Solution through Factory Method

The Factory Method pattern elegantly addresses these issues by establishing an interface for creating an object while allowing subclasses to change the kind of objects that are created. This technique allows a class to delegate instantiation to its subclasses, promoting loose coupling, increasing modularity, and enabling scalability and extensibility in the programme.

## Real-World Applications

1. **GUI Toolkit Components**: Differentiates across operating systems by creating GUI elements (such as buttons or windows) that match the OS's appearance and feel.
2. **Document Management**: Enables software to support a variety of document formats (PDF, Word, Spreadsheet), allowing for the creation of related document editors or viewers based on file type or user preferences.
3. **Logistics Management**: Adapts to various modes of transportation (road, sea, and air) by instantiating appropriate transport objects, allowing for the seamless integration of new transportation types.
4. **Payment Gateways**: Supports multiple payment methods (credit card, PayPal, bank transfer) by creating appropriate payment processing objects, making it easier to add new payment options.
5. **Data Exporters**: Allows you to export data into a variety of formats (CSV, XML, JSON) by defining particular exporter classes, making it simple to add support for new file types.

## Structure

The Factory Method pattern typically includes the following components:

1. **Creator**: An abstract class or interface that declares the factory method and returns a Product object.
2. **Concrete Creator**: Subclasses of the Creator that implement the factory method to instantiate a particular Product.
3. **Product**: An interface or abstract class that specifies the objects that the factory method will generate.
4. **Concrete Product**: These are specific implementations of the Product interface that the Concrete Creator will create.

## Real-World Example with Code Snippet

Consider a basic UI framework that requires different sorts of buttons for various operating systems:

```Java
public abstract class Button {
    public abstract void render();
}

public class WindowsButton extends Button {
    public void render() {
        System.out.println("Render a button in a Windows style");
    }
}

public class MacOSButton extends Button {
    public void render() {
        System.out.println("Render a button in a macOS style");
    }
}

public abstract class Dialog {
    public void renderWindow() {
        Button okButton = createButton();
        okButton.render();
    }
    public abstract Button createButton();
}

public class WindowsDialog extends Dialog {
    public Button createButton() {
        return new WindowsButton();
    }
}

public class MacOSDialog extends Dialog {
    public Button createButton() {
        return new MacOSButton();
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        Dialog dialog;

        // Determine the operating system style and create the appropriate dialog
        String os = "Windows"; // or "MacOS"
        
        if (os.equals("Windows")) {
            dialog = new WindowsDialog();
        } else {
            dialog = new MacOSDialog();
        }

        // Render the window, which in turn renders the button in the appropriate style
        dialog.renderWindow();

        // Optionally, switch to another OS dialog
        System.out.println("Switching to macOS dialog:");
        dialog = new MacOSDialog(); // switch to the macOS style dialog
        dialog.renderWindow();
    }
}

```

In this example, Dialogue is the Creator, whereas WindowsDialog and MacOSDialog are Concrete Creators, making their respective Concrete Products, WindowsButton and MacOSButton.

## Pros and cons

### Pros:

1. Increases flexibility and reusability by separating client code from concrete classes.
2. Supports the open/closed approach, allowing the system to offer new types of goods while preserving existing code.
3. Streamlines code maintenance and extension.

### Cons:

1. As each new product necessitates a new concrete creator, there may be an increase in the number of classes.
2. Introducing multiple additional subclasses may complicate the code structure.

## Conclusion

The Factory Method Design Pattern provides a solid approach for attaining flexibility and separation of concerns in object development. By delegating the instantiation logic to subclasses, it creates a framework for adding new types of goods without changing the client code, making the system more scalable and manageable.