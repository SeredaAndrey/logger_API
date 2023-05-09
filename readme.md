Registartion
POST: /api/auth/reg body:{email:"", password:""}

Verification
GET: /api/owner/verify/:token

Auntentification
POST: /api/auth/login body:{email:"", password:""}
GET: /api/auth/logout heder:Autorization: Bearer token

Patching user firstname, seccondname and avatar
PATCH: /api/owner/patchName body:{firstName:"", seccondName:""}, heder:Autorization: Bearer token
PATCH: /api/owner/patchAvatar body:{avatar: file}, heder:Autorization: Bearer token

Gettig user data
GET: /api/owner/avatar/:avatarNameFile, heder:Autorization: Bearer token
GET: /api/owner, heder:Autorization: Bearer token

Create, Patching and Getting setting generator
GET: /api/generator, heder:Autorization: Bearer token
POST: /api/generator, heder:Autorization: Bearer token
PATCH: /api/generator/:generatorId, heder:Autorization: Bearer token
DELETE: /api/generator/:generatorId, heder:Autorization: Bearer token

Create, Patching and Getting general setting
GET: /api/setting, heder:Autorization: Bearer token
POST: /api/setting, heder:Autorization: Bearer token
PATCH: /api/setting/:settingsId, heder:Autorization: Bearer token
DELETE: /api/setting/:settingsId, heder:Autorization: Bearer token

Create, Patching and Getting working cycles
GET: /api/cycles, heder:Autorization: Bearer token
GET: /api/cycles/:cycleId, heder:Autorization: Bearer token
POST: /api/cycles, heder:Autorization: Bearer token
PATCH: /api/cycles/:cycleId, heder:Autorization: Bearer token
DELETE: /api/cycles/:cycleId, heder:Autorization: Bearer token

Create, Patching and Getting Calculation data
GET: /api/calcdata, heder:Autorization: Bearer token
POST: /api/calcdata, heder:Autorization: Bearer token
PATCH: /api/calcdata/:calcDataId, heder:Autorization: Bearer token
DELETE: /api/calcdata/:calcDataId, heder:Autorization: Bearer token
