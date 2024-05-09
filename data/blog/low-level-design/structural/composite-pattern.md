---
title: 'Composite Pattern'
date: '2024-03-25'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Structural Design Pattern']
draft: false
summary: 'Harmonizing Individuals and Compositions: The Composite Pattern for Unified Object Management.'
authors: ['default']
type: 'Blog'
images: []
---

A structural design pattern called the Composite Pattern combines elements to create tree structures that depict part-whole hierarchies. Clients can interact similarly with single objects and compositions of objects because to this pattern's creation of a uniform interface that handles individual objects and compositions of objects identically.

## Current Problem

Managing collections of objects and individual objects independently in object-oriented design can result in complicated, conditional code, particularly when it comes to distinguishing between compositions of objects and individual objects. In hierarchical systems, this complexity increases since operations must be performed equally on both leaf nodes and composite items.

## Solution through Composite Pattern

By treating individual objects and object compositions equally, the Composite Pattern resolves these problems. A common interface or abstract class that applies to both individual objects (leaves) and their composites is defined in order to do this. As a result, it makes the client code more broad and simpler by doing away with the requirement to discriminate between the two.

## Real-World Applications

1. **Graphic Drawing Editors**: Managing complex graphics composed of simple shapes (circles, rectangles) and groups of shapes treated uniformly (moving, scaling).
2. **File and Directory Structures**: Representing directories (composites) and files (leaves) with a structure that allows operations like copying or moving to be applied uniformly.
3. **Menu Systems**: Building menu items (leaves) and sub-menus (composites) in applications, where each can be interacted with in a consistent manner, whether it's clicking a menu item or navigating through nested sub-menus.

## Structure

The key components in the Bridge Pattern include:

1. **Component**: An interface or abstract class defining common operations for both composite and leaf nodes.
2. **Leaf**: Represents leaf objects in the composition. Implements the component interface.
3. **Composite**: A class that contains child components, both simple and complex, and implements component methods.
4. **Client**: Interacts with the Component interface to work with the objects in the composition.

## Real-World Example with Code Snippet

Consider an example of a organisational structures:

```Java
// Component Interface
public interface CompanyComponent {
    void displayDetails();
}

// Leaf Class
class Employee implements CompanyComponent {
    private String name;
    private String position;

    public Employee(String name, String position) {
        this.name = name;
        this.position = position;
    }

    @Override
    public void displayDetails() {
        System.out.println("- " + position + ": " + name);
    }
}

// Composite Class
class Department implements CompanyComponent {
    private String name;
    private List<CompanyComponent> members = new ArrayList<>();

    public Department(String name) {
        this.name = name;
    }

    public void addMember(CompanyComponent member) {
        members.add(member);
    }

    @Override
    public void displayDetails() {
        System.out.println("Department: " + name);
        for (CompanyComponent member : members) {
            member.displayDetails();
        }
    }
}
```

```Java
// Main class
// Main Class to Demonstrate Usage
public class Main {
    public static void main(String[] args) {
        // Creating leaf objects: Employees
        Employee john = new Employee("John Doe", "Developer");
        Employee jane = new Employee("Jane Smith", "Designer");

        // Creating composite objects: Departments
        Department engineering = new Department("Engineering");
        Department design = new Department("Design");
        Department company = new Department("XYZ Corporation");

        // Building the tree structure
        engineering.addMember(john); // Adding employee to Engineering
        design.addMember(jane); // Adding employee to Design

        company.addMember(engineering); // Adding Engineering to Company
        company.addMember(design); // Adding Design to Company

        // Displaying the structure
        company.displayDetails(); // Displays the entire company structure
    }
}
```

## Pros and cons

### Pros:

1. Facilitates the use of the tree structure in the client code.
2. Simplifies the addition of new component types.
3. Enables the composite tree to be structured with flexibility.

### Cons:

1. Can make the design overly general, complicating the component interface.
2. Sometimes it's hard to restrict the components of a composite (e.g., not allowing certain components to have children).

## Conclusion

Using a consistent interface, the Composite Pattern offers a sophisticated way to manage hierarchical groups of items. It improves the object's flexibility and scalability within the part-whole hierarchies and greatly simplifies the client code.
