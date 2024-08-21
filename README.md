# Battlefield ⚔️

> @ [https://weizmangal.com/Battlefield](https://weizmangal.com/Battlefield)

Configure and simulate XSS and CSP environments for demonstration and testing purposes

![](demo.png)

## XSS

Pass Code to run in the page:

```javascript
alert('xss');
```

[https://weizmangal.com/Battlefield?config={"xss":"alert('xss')","csp":{}}](https://weizmangal.com/Battlefield/?config=eyJ4c3MiOiJhbGVydCgneHNzJykiLCJjc3AiOnt9fQ%3D%3D)

## CSP

Pass CSP rules to apply to the page (after XSS):

```
default-src x.com
```

[https://weizmangal.com/Battlefield?config={"xss":"","csp":{"default-src":["x.com"]}}](https://weizmangal.com/Battlefield/?config=eyJ4c3MiOiIiLCJjc3AiOnsiZGVmYXVsdC1zcmMiOlsieC5jb20iXX19)
