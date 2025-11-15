// useUpdatePremiumColors.js (Nuevo hook)

import { useForm } from 'react-hook-form';
import { updateUserInfo } from '../services/usuarios.api';

// Recibe solo los valores iniciales de color
export function useUpdatePremiumColors(colorTheme, gradientTheme, bgDivsTheme, setModalState) {
    
    // ⭐ CLAVE: useForm() es llamado aquí, aislado del modal.
    const { register, handleSubmit } = useForm({
        defaultValues: {
            color_theme: colorTheme || '#5D3FD3',
            background: gradientTheme || '#000000',
            background_divs: bgDivsTheme || '#1B1C1D',
        }
    });

    const onSubmitColors = handleSubmit(async (data) => {
        console.log('Datos de color a enviar:', data);
        try {
            const token = localStorage.getItem('access_token');
            const formData = new FormData();
            
            // Solo incluimos los campos de color, obtenidos de data
            formData.append('color_theme', data.color_theme);
            formData.append('background', data.background);
            formData.append('background_divs', data.background_divs);
            
            // ⭐ Nota: Si tu endpoint exige otros campos (e.g., ID de usuario), inclúyelos aquí.

            const res = await updateUserInfo(formData, token);
            console.log('Respuesta de la API:', res);

            setModalState(false); // Cerramos el modal
            console.log('Colores actualizados exitosamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar solo colores', error)
        }
    });

    // Devolvemos lo necesario para el formulario de colores
    return { register, onSubmitColors };
}