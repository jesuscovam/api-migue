import { json } from "@sveltejs/kit"

const tareas = {
  "tareas": [
    { "tarea": "Contar stock", "nombre": "maria", "diaDeadline": 13, "mesDeadline": 12 },
    { "tarea": "Asignar precios", "nombre": "melani", "diaDeadline": 15, "mesDeadline": 11 },
    { "tarea": "Hacer campañas", "nombre": "marianna", "diaDeadline": 19, "mesDeadline": 12 },
    { "tarea": "Contar vencimientos", "nombre": "maria", "diaDeadline": 19, "mesDeadline": 12 }
  ]
}
export const GET = async () => {
  return json(tareas)
}
