---
title: 'Iterator Pattern'
date: '2024-05-24'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Iterator Pattern: Streamlining collection traversal through uniform and encapsulated access methods.'
authors: ['default']
type: 'Blog'
images: []
---

Efficient and consistent management of collections of items is essential to programme design. A behavioural design pattern called the iterator pattern makes it possible to access an aggregate object's components one after the other without disclosing the representation that underlies it. This pattern promotes flexibility and encapsulation by enabling consistent and controlled traversal of collections, such as lists, stacks, or custom aggregate structures.

## Current Problem

Many applications require traversing of collections, which are a basic component of many applications. But accessing and controlling the traversal mechanism within the collection directly might result in tightly coupled code, which makes it challenging to modify the implementation of the collection without affecting its customers. In addition, distinct collections can call for various traversal strategies, which would increase the complexity and duplication of code.

## Solution through Iterator Pattern

These problems are resolved by the Iterator pattern, which abstracts the traversal procedure into a distinct iterator object. Clients can access elements uniformly regardless of the underlying collection type because to this decoupling. Additionally, it makes it possible to apply various traversal methods regardless of the arrangement of the collection, which improves flexibility and maintainability.

## Real-World Applications

Consider a social media application where users can browse through a collection of posts, photos, or messages. Each type of collection (e.g., a list of posts, a gallery of photos) can be traversed using an iterator without exposing its internal structure.

1. **Uniform Traversal**: Users can navigate through different types of collections in a consistent manner.
2. **Encapsulation**: The internal structure of each collection remains hidden, promoting encapsulation.
3. **Flexibility**: New types of collections can be added without altering the traversal logic in the client code.

## Structure

The Iterator pattern typically includes the following components:

1. **Iterator**: Defines an interface for accessing and traversing elements.
2. **ConcreteIterator**: Implements the Iterator interface and maintains the current position in the traversal.
3. **Aggregate**: Defines an interface for creating an iterator.
4. **ConcreteAggregate**: Implements the Aggregate interface and returns an instance of the appropriate ConcreteIterator.

## Real-World Example with Code Snippet

Let's implement a simple example where we traverse a collection of names using an iterator:

```Java
// Iterator Interface
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// Concrete Iterator
class NameIterator implements Iterator<String> {
    private String[] names;
    private int position = 0;

    public NameIterator(String[] names) {
        this.names = names;
    }

    @Override
    public boolean hasNext() {
        return position < names.length;
    }

    @Override
    public String next() {
        if (this.hasNext()) {
            return names[position++];
        }
        return null;
    }
}

// Aggregate Interface
interface Aggregate<T> {
    Iterator<T> createIterator();
}

// Concrete Aggregate
class NameCollection implements Aggregate<String> {
    private String[] names;

    public NameCollection(String[] names) {
        this.names = names;
    }

    @Override
    public Iterator<String> createIterator() {
        return new NameIterator(names);
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        String[] names = {"Alice", "Bob", "Charlie", "Diana"};
        NameCollection nameCollection = new NameCollection(names);

        Iterator<String> iterator = nameCollection.createIterator();
        while (iterator.hasNext()) {
            String name = iterator.next();
            System.out.println(name);
        }
    }
}
```

## Pros and cons

### Pros:

1. Promotes uniform access to different types of collections.
2. Enhances encapsulation by hiding the internal structure of the collection.
3. Simplifies traversal algorithms and allows them to be reused across different collections.
4. Supports multiple simultaneous traversals on the same collection.

### Cons:

1. Can introduce additional complexity with the creation of iterator classes.
2. May be less efficient for certain types of collections, particularly those that can be traversed more efficiently using built-in language constructs.

## Conclusion

A reliable method for uniformly and condensedly traversing collections is the Iterator pattern. It improves flexibility, maintainability, and code reuse by separating the traversal mechanism from the collection's structure. This pattern is especially helpful in situations where it is necessary to access various collections in a consistent manner while maintaining the privacy of the collections' underlying structure.
