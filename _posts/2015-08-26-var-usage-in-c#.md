---
title: "Var usage in C#"
permalink: /2015/08/26/var-usage-in-c%23/
keywords:
  - c-sharp
  - clean code
---

The following code snippets illustrate how the usage of the `var` keyword can shorten the feedback loop and prevent errors.

## Simple class hierarchy

{% highlight csharp %}

class Animal {}
class Dog : Animal {}
class Cat : Animal {}

{% endhighlight %}

## Code without using `var`

{% highlight csharp %}

Animal[] arr = new Dog[3];
arr[0] = new Cat();

{% endhighlight %}

The code will compile successfully. However, at runtime it will blow up pretty bad. There is no way to fit a `Cat` into a `Dog`.

## Code using `var`

{% highlight csharp %}

var arr = new Dog[3];
arr[0] = new Cat();

{% endhighlight %}

The code will not even compile. The compiler infers `arr` to be an array of Dogs. It prevents Cats from being inserted into the array. 

## Summary

In both cases the code fails. However, the usage of `var` allows some errors to be catched during compilation. Errors are preferably catched as early as possible.

The code from the first snippet could have easily made it into production impacting the application users. Whereas the code from the second snippet was catched by the developer who wrote it. [^bottom_ten_link]

[^bottom_ten_link]: Eric Lippert always has great insights on the language. [Sharp Regrets: Top 10 Worst C# Features](http://www.informit.com/articles/article.aspx?p=2425867)
