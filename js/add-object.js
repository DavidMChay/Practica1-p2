document.addEventListener('DOMContentLoaded', function() {
    flatpickr('#startDate', {
        dateFormat: 'd-m-Y',
        enableTime: false,
    });

    flatpickr('#endDate', {
        dateFormat: 'd-m-Y',
        enableTime: false,
    });

    const taskForm = document.getElementById('taskForm');
    const listToDo = document.getElementById('listToDo');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (taskForm.checkValidity()) {
            const taskTitle = document.getElementById('taskTitle').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const taskResponsible = document.getElementById('taskResponsible').value;

            // Validar coherencia de fechas
            const startDateObj = new Date(startDate.split('-').reverse().join('-'));
            const endDateObj = new Date(endDate.split('-').reverse().join('-'));

            if (startDateObj > endDateObj) {
                alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
                return;
            }

            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            
            taskItem.innerHTML = `
                <div class="task-details">
                    <h5>${taskTitle}</h5>
                    <p><strong>Inicio:</strong> ${startDate}</p>
                    <p><strong>Fin:</strong> ${endDate}</p>
                    <p><strong>Responsable:</strong> ${taskResponsible}</p>
                </div>
                <div class="task-actions">
                    <button class="btn btn-outline-danger btn-sm">Eliminar</button>
                    <button class="btn btn-outline-primary btn-sm">Completado</button>
                    <button class="btn btn-outline-secondary btn-sm d-none">Desmarcar</button>
                </div>
            `;

            const deleteButton = taskItem.querySelector('.btn-outline-danger');
            const completeButton = taskItem.querySelector('.btn-outline-primary');
            const uncompleteButton = taskItem.querySelector('.btn-outline-secondary');
            
            // Validar fecha de fin para marcar como completada
            completeButton.addEventListener('click', function() {
                if (new Date() > endDateObj) {
                    alert('No se puede marcar como completada una tarea que ya finalizó.');
                } else {
                    taskItem.classList.add('completed');
                    completeButton.classList.add('d-none');
                    uncompleteButton.classList.remove('d-none');
                }
            });

            // Confirmar desmarcar tarea
            uncompleteButton.addEventListener('click', function() {
                if (confirm('¿Está seguro que desea desmarcar está tarea completada?')) {
                    taskItem.classList.remove('completed');
                    completeButton.classList.remove('d-none');
                    uncompleteButton.classList.add('d-none');
                }
            });

            // Confirmar eliminación de tarea
            deleteButton.addEventListener('click', function() {
                if (confirm('¿Está seguro de que desea eliminar definitivamente esta tarea?')) {
                    listToDo.removeChild(taskItem);
                }
            });

            // Colorear tareas vencidas
            if (new Date() > endDateObj) {
                taskItem.classList.add('expired');
            }

            listToDo.appendChild(taskItem);
            taskForm.reset();
            taskForm.classList.remove('was-validated');
        } else {
            taskForm.classList.add('was-validated');
        }
    });
});
