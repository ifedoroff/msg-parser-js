This project allows to parse Outlook MSG files and perform certain operations:
* Traverse structure (i.e. access attachments, embedded MSG files, recipients)
* Retrieve properties of objects
* Extract attachments and embedded MSG files (the same is true for attachments and embedded message of embedded MSG files :) ).

Project doesn't support modification of an MSG file and there is no plan of adding such a support in a near future. But it is possible to create an extension for this purpose.
Code relies on the implementation of Compound Binary File format from this GIT repository: https://github.com/ifedoroff/compound-file-js . 

#### **Usage**

You can find example of usage in test/example.spec.ts

**List of useful references for understanding of the MSG format:** \
[MS-OXMSG](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxmsg/b046868c-9fbf-41ae-9ffb-8de2bd4eec82) \
[MS-OXPROPS](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxprops/f6ab1613-aefe-447d-a49c-18217230b148) 
