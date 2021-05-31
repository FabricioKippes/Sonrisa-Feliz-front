# sonrisa-feliz

## local setup

1. Abrir una terminal y cd hasta el directorio donde va a estar la carpeta del proyecto
2. ejecutar `git clone git@gitlab.com:msi-sonrisa-feliz/sonrisa-feliz-front.git`
3. `cd sonrisa-feliz-front`
4. arrancar la app corriendo `lando start`


## Git flow
1. Traerse los ultimos cambios de la rama master con `git pull origin master`.
2. Crearse una rama local con `git checkout -b nombre-branch` y trabajar sobre esa branch.
3. Para commitear los cambios, primero se debe indicar qué archivos se quieren guardar con: `git add .` (si se quieren guardar todos) o `git add nombre-archivo1 nombre-archivo2` (para elegir especificos).
4. Para guardar el estado de los archivos agregados (commitear) en el paso anterior usar `git commit -m "descripcion de los cambios"`.
5. Para subir una rama local al repositorio remoto (hasta el ultimo commit realizado) usar `git push -u origin nombre-branch`.

Para fucionar una rama con la rama master primero:
1. Hacer commit del estado actual
2. Cambiarse a la rama master con `git checkout master`.
3. Traerse los ultimos cambios con `git pull`.
4. Volver a cambiarse su rama.
5. Ejecutar `git merge master --no-ff".
6. Si no hay conflictos le pedirá que confirme el commit: apretar escape, tipear ":wq" y aprentar enter.
7. Enviar los cambios a su rama remota con `git push -u origin master`
8. Crear un Merge Request y esperar la aprobación del resto de los miembros del equipo.

