---
title: 'Abstract Factory Method'
date: '2024-03-10'
tags: ['System Design', 'Low Level Design', 'LLD']
draft: false
summary: 'Harmonizing Object Creation: The Abstract Factory Method for Cohesive and Interchangeable Product Families.'
authors: ['default']
type: 'Blog'
images: []
---

The Abstract Factory Method is a pinnacle of design patterns, providing a complex technique to encapsulate a collection of independent factories working towards a common goal. It distinguishes itself in the field of creational patterns by allowing the formation of families of connected or dependent items without specifying their exact classes.

## Current Problem

Developers sometimes confront issues when attempting to create families of related objects or goods without knowing their concrete classes. The need to manage and maintain many factories for different product families can result in complex, error-prone, and tightly connected code, especially as the system grows to incorporate more goods or dependencies.

## Solution through Abstract Factory Method

The Abstract Factory Method tackles these complications by allowing you to create families of linked items without specifying their concrete classes. This pattern promotes the use of object composition to increase flexibility, allowing a system to function independently of how its products are formed, composed, and represented.

## Real-World Applications

1. **Cross-Platform UI Kits**: Allows for the construction of uniform UI elements (buttons, checkboxes, and text fields) that match the aesthetics of many operating systems without changing the client code.
2. **Database Access Layers**: Provides an abstraction layer for database operations, enabling for the seamless interchange of database types (SQL and NoSQL) while keeping the application code constant and unchanged.
3. **Vehicle Manufacturer**: Allows a car manufacturer to build many types of vehicles (sedans, SUVs, convertibles) and associated parts (engines, tyres, windows) without tying the client code to specific vehicle or part brands.


## Structure

The Abstract Factory typically includes the following components:

1. **Abstract Factory**: An interface declaring a set of methods for creating each type of the abstract products.
2. **Concrete Factory**: Implements the abstract factory's methods to create concrete products.
3. **Abstract Product**: Declares a type for a specific kind of product object.
4. **Concrete Product**: Implements the abstract product interface to define a product to be created.
5. **Client**: Uses interfaces declared by the abstract factory and abstract products to access the concrete products.

## Real-World Example with Code Snippet

Consider an application needing to support multiple themes, dark and light, where each theme has different types of buttons and checkboxes:


```Java
public interface Button {
    void paint();
}

public interface Checkbox {
    void paint();
}

public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

public class DarkThemeFactory implements GUIFactory {
    public Button createButton() {
        return new DarkButton();
    }
    public Checkbox createCheckbox() {
        return new DarkCheckbox();
    }
}

public class LightThemeFactory implements GUIFactory {
    public Button createButton() {
        return new LightButton();
    }
    public Checkbox createCheckbox() {
        return new LightCheckbox();
    }
}

public class DarkButton implements Button {
    public void paint() {
        System.out.println("Rendering button in dark theme");
    }
}

public class LightButton implements Button {
    public void paint() {
        System.out.println("Rendering button in light theme");
    }
}

public class DarkCheckbox implements Checkbox {
    public void paint() {
        System.out.println("Rendering checkbox in dark theme");
    }
}

public class LightCheckbox implements Checkbox {
    public void paint() {
        System.out.println("Rendering checkbox in light theme");
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        // Choose the theme
        GUIFactory guiFactory = new DarkThemeFactory(); // or use new LightThemeFactory()

        // Create button and checkbox using the factory
        Button button = guiFactory.createButton();
        Checkbox checkbox = guiFactory.createCheckbox();

        // Paint the UI elements
        button.paint();
        checkbox.paint();

        // Switching to light theme
        System.out.println("Switching to light theme:");
        guiFactory = new LightThemeFactory();
        button = guiFactory.createButton();
        checkbox = guiFactory.createCheckbox();

        // Paint the UI elements for light theme
        button.paint();
        checkbox.paint();
    }
}
```

This code snippet demonstrates the use of the Abstract Factory pattern to create cohesive theme-related GUI components without specifying their concrete classes.

## Pros and cons

### Pros:

1. Promotes consistency in the items created.
2. Separates concrete classes from the client.
3. Improves product or family interchangeability.
4. Encourages adherence to the Single Responsibility and Open/Closed SOLID principles.

### Cons:

1. Can add complexity to the code, making it more difficult to comprehend and maintain.
2. Requires the creation of many additional classes/interfaces, which might greatly increase the codebase size.
3. The addition of additional items or product families can be difficult because the Abstract Factory interface may require adjustments.

## Conclusion

The Abstract Factory Method is extremely useful for systems that require the construction of a large number of objects that belong to the same theme or family. It performs well in cases in which the system must be independent of how its products are formed, composed, and represented. While it provides substantial benefits in terms of flexibility and consistency, it is critical to weigh the trade-offs in terms of complexity and number of classes.