# GBSON
File format definition used by [the GeSeq annotation software](https://chlorobox.mpimp-golm.mpg.de/geseq.html) to represent GenBank data as JSON.

## Example JSON output
An example output can be found here: [GBSON-Example.json](https://chlorobox.mpimp-golm.mpg.de/GBSON-Example.json).

## Usage 
To use GBSON in your application you can use any standard JSON parser. If you are programming in JavaScript, just do
```javascript
const data = JSON.parse(gbson);
```

In TypeScript you should add the type declaration from this repository to get full IDE support 
```typescript
import { GBSON } from "./GBSON";

const data:GBSON = JSON.parse(gbson);
```

And access the data like this
```typescript
const gene = data.features[0].gene;
```

## Range definitions

### GenBank
```genbank
complement(join(125294..125832,126877..127429))
```

### GBSON
```json
{ "complement" : { "joined" : [ [ 125294, 125832 ], [ 126877, 127429 ] ] } }
```

## Nested Features
An advantage of using JSON over GenBank or GFF is its intrinsic capability to express nested structures:

![Nested Features](https://chlorobox.mpimp-golm.mpg.de/GBSON-Nested-Features.jpg "Nested Features")