---
title: Unstable identifiers in Pattern Matching with Scala
---

[Pattern Matching](https://en.m.wikipedia.org/wiki/Pattern_matching) is a defining feature of functional programming. [*citation_needed*] Since Scala is a functional programming language it comes with built-in support for pattern matching. [^pattern_matching] However, Scala novices can find some unexpected behaviors in pattern matching. This article is a brief introduction to the usage of stable identifiers in Scala's pattern matching constructs.

##Operations
The following case classes define typical mathematical operations.  

{% highlight scala %}
abstract class Token
case class TNum(n: Double) extends Token
case class TOpenP() extends Token
case class TCloseP() extends Token
case class TSum() extends Token
case class TDiff() extends Token
case class TMult() extends Token
case class TDiv() extends Token
case class TNeg() extends Token
{% endhighlight %}

##Priorities
`priorities` is a constant list of tuples with the priority for each math operation.  

{% highlight scala %}
val priorities = List(
    (0, TSum()),
    (0, TDiff()),
    (1, TMult()),
    (1, TDiv()),
    (1, TNeg()),
    (3, TOpenP())
)
{% endhighlight %}

##Multiplication Priority should be 1
The following snipet finds the priority of multiplication.  

{% highlight scala %}
priorities.collectFirst({ case (x, TMult()) => x }).get
{% endhighlight %}

The result is 1. `collectFirst` is finding the first tuple from `priorities` whose second value is `TMult()` and then returning the tuple's first value which is the priority.

##Multiplication Priority should *ALWAYS* be 1
Now let's define a constant with the operation value instead of hardcoding it into the pattern matching construct. The result should still be 1 because all we did was extract a variable.  

{% highlight scala %}
val op: Token = TMult()
priorities.collectFirst({ case (x, op) => x }).get
{% endhighlight %}

However, the result is now 0.  
![Why!!!](/images/stable-identifiers/y-u-no-guy.jpg)  
The problem with this code is that `op` is not a [stable identifier](http://www.scala-lang.org/files/archive/spec/2.11/08-pattern-matching.html#stable-identifier-patterns). The pattern matching construct is defining a new variable `op` that shadows the existing `op`. 

##No outside variables in pattern matching
The following code overcomes the need for making `op` a stable identifier by simply not using it inside of a pattern matching construct.  

{% highlight scala %}
priorities.collectFirst({ case (x, y) if y == op => x }).get
{% endhighlight %}

The result is now 1 as it should be. However, does this mean that whenever I need to check the value of an external variable in a pattern matching construct I need to resort to this? Surely the language designers behind Scala thought of a better solution to this mess.

##Backticks to the rescue
Using `op` enclosed in backticks does not create a new variable that shadows the existing one. It creates a stable identifier instead.  

{% highlight scala %}
priorities.collectFirst({ case (x, `op`) => x }).get
{% endhighlight %}

While the result is still 1, the code is much cleaner now.

##Backticks are ugly
Not everybody likes backticks in their pattern matching statements. Fortunately, Scala is very similar to Ruby in the sense that the same result can be achieved through different ways. The language creators came up with an uppercasing convention: if the variable name starts with a capital letter, then it is a stable identifier.

{% highlight scala %}
val Op: Token = TMult()
priorities.collectFirst({ case (x, Op) => x }).get
{% endhighlight %}

The result remains 1 without using any backticks.

##Summary
Stable identifiers are a language feature that may not be clear to novice Scala developers. Fortunately, the language provides several alternatives to deal with them. All the code for this guide [can be found on GitHub](https://gist.github.com/camilin87/718451d75e4b0fd3325a). [^extra_info]


[^pattern_matching]: [Gentle introduction to pattern matching in Scala](http://docs.scala-lang.org/tutorials/tour/pattern-matching.html). [More formal definition of pattern matching in Scala](http://www.scala-lang.org/files/archive/spec/2.11/08-pattern-matching.html).

[^extra_info]: Additionally, [this StackOverflow answer](http://stackoverflow.com/questions/7078022/why-does-pattern-matching-in-scala-not-work-with-variables) provides very good information on stable identifiers and pattern matching.
