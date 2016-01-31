---
title: Compiler Warning CS0659
---

The majority of C# developers have found [Compiler Warning CS0659](https://msdn.microsoft.com/en-us/library/xxhbfytk.aspx) at some point of their careers. Ignoring this warning can produce unexpected program behavior. The following is summary of the impact this warning can have on a codebase and how to prevent it.

**TL;DR: Override `GetHashCode` whenever `Equals` is overridden**

##Reference Equality
Let's consider the following `Dog` class in C#.

{% highlight csharp %}
public class Dog
{
    public int Weight { get; set; }
    public string Name { get; set; }
}
{% endhighlight %}

And the following usage of it.

{% highlight csharp %}
var fido1 = new Dog { Name = "Fido", Weight = 12 };
var fido2 = new Dog { Name = "Fido", Weight = 12 };
Console.WriteLine(fido1.Equals(fido2));
{% endhighlight %}

The snippet of code from above prints `False`. For reference types the default implementation of `Equals` compares the references instead of the values where they are pointing to. [^object_equals]

*[Github Commit 5d488e6d6127111167e9a8f36fe83a771e36cb9c](https://github.com/camilin87/CS0659/commit/5d488e6d6127111167e9a8f36fe83a771e36cb9c?diff=unified) contains the sample source code up to this point*

##Semantic Equality

Let's enhance the `Dog` class so that comparisons between `Dogs` have a better semantic meaning.

{% highlight csharp %}
public class Dog
{
    public int Weight { get; set; }
    public string Name { get; set; }
    
    public override bool Equals(object obj)
    {
        var that = (Dog)obj;
        return this.Weight == that.Weight && this.Name == that.Name;
    }
}
{% endhighlight %}

After overriding the `Equals` method the following code prints `True`.

{% highlight csharp %}
var fido1 = new Dog { Name = "Fido", Weight = 12 };
var fido2 = new Dog { Name = "Fido", Weight = 12 };
Console.WriteLine(fido1.Equals(fido2));
{% endhighlight %}

*[Github Commit 7abeb0d9b8dbf7c09124485fb0f7e3bd18257b18](https://github.com/camilin87/CS0659/commit/7abeb0d9b8dbf7c09124485fb0f7e3bd18257b18) contains the sample source code up to this point*

##Warning CS0659
Once we compile the code we get the following warning.

> warning CS0659: 'Dog' overrides Object.Equals(object o) but does not override Object.GetHashCode()

[Compiler Warning (level 3) CS0659](https://msdn.microsoft.com/en-us/library/xxhbfytk.aspx) is straightforward and direct to the point: If you override `Equals` you need to override `GetHashCode`.

##The Problem
This is not one of those warnings that can safely be ignored. [^warning_levels] It will come back to bite you. Let's consider the following usages of the `Dog` class.

{% highlight csharp %}
var dogShelter = new Dictionary<Dog, int>{
    {new Dog { Name = "Fido", Weight = 12 }, 100},
    {new Dog { Name = "Pete", Weight = 5 }, 10}
};
var fido = new Dog { Name = "Fido", Weight = 12 };
Console.WriteLine(dogShelter.ContainsKey(fido));
{% endhighlight %}

The code from above prints `False` because `fido` cannot be found in `dogShelter`.  
![There comes the bite in the ass](http://i.giphy.com/vdLRwjtIZ7g3K.gif)

###Why?
Overriding `Equals` is not enough. The `GetHashCode` method provides a numeric value for quick equality checks such as those used in collections like `Dictionary` and `HashTable`. [^gethashcode]

*[Github Commit d91504bfedcb60ab86fffe72dcac88fb775405de](https://github.com/camilin87/CS0659/commit/d91504bfedcb60ab86fffe72dcac88fb775405de) contains the sample source code up to this point*

##Solution

Override `GetHashCode` whenever `Equals` is overridden. The following is an implementation of `Dog` where `GetHashCode` is overridden. [^resharper_implementation]

{% highlight csharp %}
public class Dog
{
    public int Weight { get; set; }
    public string Name { get; set; }
    
    public override bool Equals(object obj)
    {
        var that = (Dog)obj;
        return this.Weight == that.Weight && this.Name == that.Name;
    }
    
    public override int GetHashCode()
    {
        unchecked
        {
            return (Weight * 397) ^ (Name != null ? Name.GetHashCode() : 0);
        }
    }
}
{% endhighlight %}

With this implementation of `Dog` in place, `fido` can be found in the `dogShelter`.

{% highlight csharp %}
var dogShelter = new Dictionary<Dog, int>{
    {new Dog { Name = "Fido", Weight = 12 }, 100},
    {new Dog { Name = "Pete", Weight = 5 }, 10}
};
var fido = new Dog { Name = "Fido", Weight = 12 };
Console.WriteLine(dogShelter.ContainsKey(fido));
{% endhighlight %}

*[Github Commit 98c9adc1fff2aee2362fd494f3a43cdb7f4d3d8a](https://github.com/camilin87/CS0659/commit/98c9adc1fff2aee2362fd494f3a43cdb7f4d3d8a) contains the sample source code up to this point*

##In a nutshell
`Object.GetHashCode` is as important as `Object.Equals` for equality matters. Never override one without the other. [^dotnet_equality]

[^dotnet_equality]: [The Right Way to do Equality in C#](http://www.aaronstannard.com/overriding-equality-in-dotnet/)

[^object_equals]: [Object.Equals Method (Object)](https://msdn.microsoft.com/en-us/library/bsc2ak47(v=vs.110).aspx#)

[^warning_levels]: [Warning levels, what are they, which level to use, and should they be treated as errors?](http://irisclasson.com/2012/11/19/stupid-question-87-warning-levels-what-are-they-which-level-to-use-and-should-they-be-treated-as-errors/)

[^gethashcode]: [Object.GetHashCode Method ()](https://msdn.microsoft.com/en-us/library/system.object.gethashcode.aspx)

[^resharper_implementation]: [ReSharper](https://www.jetbrains.com/resharper/) users can benefit from automatic generation of `GetHashCode` implementations