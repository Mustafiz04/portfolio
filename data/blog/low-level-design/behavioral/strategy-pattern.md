---
title: 'Strategy Pattern'
date: '2024-06-10'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Strategy Pattern: Enhancing flexibility and maintainability through interchangeable algorithms.'
authors: ['default']
type: 'Blog'
images: []
---

One behavioural design pattern that makes it possible to choose an algorithm's behaviour at runtime is the Strategy pattern. In the context of a particular operation, this pattern specifies a family of algorithms, encapsulates them as distinct classes, and allows for their interchangeability. When there are several algorithms that can be used for a given task, the Strategy pattern helps since it enables the system to select the best one dynamically without changing the clients that use it.

## Current Problem

Various algorithms or techniques are employed in several software systems to accomplish certain tasks. When these algorithms are implemented directly in a class, the resulting code may become complex and rigid, making it challenging to maintain and expand. The system's flexibility and scalability are also diminished by hardcoding these methods, which makes it difficult to switch between them at runtime depending on various conditions.

## Solution through Strategy Pattern

By designing a family of algorithms and enclosing each one in a distinct strategy class, the Strategy pattern solves these problems. One of these strategy classes is assigned the particular duty by the context class. By encouraging the Open/Closed Principle, this method makes it possible to introduce new algorithms without changing the old code. Additionally, it improves flexibility and scalability by enabling runtime selection and modification of algorithms.

## Real-World Applications

Consider a payment processing system where different payment methods (e.g., credit card, PayPal, bank transfer) can be used.

1. **Multiple Algorithms**: Different payment methods are implemented as separate strategy classes.
2. **Encapsulation**: Each payment method is encapsulated, allowing the payment processing system to choose among them dynamically.
3. **Flexibility**: New payment methods can be added without changing the existing payment processing system.

## Structure

The Strategy pattern typically includes the following components:

1. **Strategy**: Declares an interface common to all supported algorithms.
2. **ConcreteStrategy**: Implements the algorithm using the Strategy interface.
3. **Context**: Maintains a reference to a Strategy object and delegates the algorithm to the current strategy.

## Real-World Example with Code Snippet

Let's implement an example where a payment system uses different strategies for processing payments:

```Java
// Strategy Interface
interface PaymentStrategy {
    void pay(int amount);
}

// ConcreteStrategy for Credit Card Payment
class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cardHolderName;

    public CreditCardPayment(String cardNumber, String cardHolderName) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card: " + cardNumber);
    }
}

// ConcreteStrategy for PayPal Payment
class PayPalPayment implements PaymentStrategy {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using PayPal: " + email);
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        // Paying with credit card
        cart.setPaymentStrategy(new CreditCardPayment("1234-5678-9876-5432", "John Doe"));
        cart.checkout(100);

        // Paying with PayPal
        cart.setPaymentStrategy(new PayPalPayment("john.doe@example.com"));
        cart.checkout(200);
    }
}
```

## Pros and cons

### Pros:

1. Promotes the Open/Closed Principle by allowing new algorithms to be added without modifying existing code.
2. Enhances flexibility by enabling algorithms to be switched at runtime.
3. Simplifies unit testing by encapsulating algorithms in separate classes.

### Cons:

1. Increases the number of classes, adding complexity to the system.
2. Requires careful management of strategy objects, particularly in resource-constrained environments.
3. Can introduce overhead due to delegation if the strategies are simple.

## Conclusion

For systems that need different algorithms for different tasks, the Strategy pattern provides a reliable solution. Enhancing flexibility and promoting maintainability, the pattern encapsulates algorithms in distinct classes that can be swapped out. The Strategy pattern is an important tool in a software developer's toolbox since it enables runtime algorithm selection and adheres to the Open/Closed Principle, even though there may be possible increases in complexity.