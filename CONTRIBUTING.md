## Cómo clonar, ejecutar y mantenerse sincronizado con este repositorio

Este archivo explica, en pasos claros, cómo clonar el repositorio, instalar dependencias, ejecutar las aplicaciones (Frontend y Backend) y cómo sincronizar correctamente con `origin/main` para que todos los colaboradores vean los cambios.

---

### Requisitos

- Node.js (v16+ recomendado) y npm instalados.
- Git instalado.
- Acceso al repositorio en GitHub (si el repo es privado, pide acceso al propietario).

### Clonar el repositorio

En la máquina del colaborador ejecutar (PowerShell):

```powershell
git clone https://github.com/APACHES6X/Portal-CEA-San-Emigdio.git
cd "Portal-CEA-San-Emigdio"
```

### Ejecutar el Frontend (Vite + React + Tailwind)

```powershell
cd Frontend
npm install
npm run dev
```

Esto levantará el servidor de desarrollo (por defecto en http://localhost:5173/). Si hay errores en PostCSS/Tailwind, ver la sección de resolución de problemas abajo.

### Ejecutar el Backend (Node)

```powershell
cd Backend
npm install
# si hay script start en package.json
npm start
# o, si es un servidor simple
node server.js
```

### Mantener la copia local sincronizada (lo que tu amigo debe hacer para ver tus cambios)

Cada vez que quiera traer los cambios del repositorio remoto:

```powershell
cd "ruta\al\repo"
git remote -v               # verificar URL remota
git fetch origin            # trae referencias remotas
git checkout main           # cambiar a main
git pull origin main        # traer y fusionar los cambios
```

Si `git pull` falla por cambios locales sin commitear, puede guardarlos temporalmente:

```powershell
git stash push -m "trabajo temporal"
git pull origin main
git stash pop               # aplicar de nuevo los cambios si lo desea
```

Si el colaborador quiere forzar que su copia quede exactamente como GitHub (pierde cambios locales no guardados):

```powershell
git fetch origin
git checkout main
git reset --hard origin/main   # ADVERTENCIA: esto eliminará cambios locales no committeados
```

### Comprobaciones rápidas si no aparecen los cambios de otro colaborador

- Asegúrate de que la URL remota sea la correcta: `git remote -v` debe mostrar `https://github.com/APACHES6X/Portal-CEA-San-Emigdio.git`.
- Verifica la rama: `git branch -vv` — debe indicar `main` trackeando `origin/main`.
- Si ves otra rama (`master` u otra), cámbiate a `main` con `git checkout main`.
- Si el repo es privado, confirma que te hayan dado permiso de acceso.
- En la web de GitHub, selecciona la rama `main` y confirma que el último commit coincida con el que esperas.

### Problemas comunes y soluciones rápidas

- Error PostCSS/Tailwind en Vite:
  - Asegúrate de haber corrido `npm install` en `Frontend`.
  - Comprueba que existe `tailwind.config.js` y `postcss.config.js` en la carpeta `Frontend`.
  - Si ves errores sobre utilidades inexistentes al usar `@apply`, revisa que esas utilidades existan o reemplázalas por propiedades CSS (por ejemplo `font-family: inherit;`).

- Advertencias del editor (VS Code) sobre `@tailwind` o `@apply`:
  - Instala Tailwind CSS IntelliSense en VS Code.
  - Asegúrate de que el workspace tenga las settings adecuadas para Tailwind (si se agregaron `.vscode/settings.json` al repo ya están incluidas).

### Buenas prácticas para colaborar

- Hacer commits pequeños y con mensajes claros.
- Antes de trabajar, hacer `git pull origin main` para empezar con la versión más reciente.
- Si vas a trabajar en una característica grande, crea una rama nueva: `git checkout -b feat/mi-cambios` y luego abre un pull request.
---
