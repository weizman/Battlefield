# Battlefield

> @ [https://weizmangal.com/battlefield](https://weizmangal.com/battlefield)

Configure and simulate XSS and CSP environments for demonstration and testing purposes

![](demo.png)

## XSS

Pass Code to run in the page:

```javascript
alert('xss');
```

[https://weizmangal.com/battlefield?config={"xss":"alert('xss')","csp":{}}](https://weizmangal.com/battlefield?config=%7B%22xss%22%3A%22alert%28%27xss%27%29%22%2C%22csp%22%3A%7B%7D%7D)

## CSP

Pass CSP rules to apply to the page (after XSS):

```
default-src x.com
```

[https://weizmangal.com/battlefield?config={"xss":"","csp":{"default-src":["x.com"]}}](https://weizmangal.com/battlefield?config=%7B"xss"%3A""%2C"csp"%3A%7B"default-src"%3A%5B"x.com"%5D%7D%7D)
