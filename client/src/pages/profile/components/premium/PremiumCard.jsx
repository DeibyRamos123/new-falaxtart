import React, { useState } from 'react';
import '../../../../styles/PremiumCardProfile.css';
import { useUpdatePremiumColors } from '../../../../hooks/useUpdatePremiumColors';

export function PremiumCard({ img, coverImg, colorTheme, gradientTheme, bgDivsTheme, setModalState }) {

    const { register, onSubmitColors } = useUpdatePremiumColors(colorTheme, gradientTheme, bgDivsTheme, setModalState);

    // ESTADO LOCAL (PARA VISTA PREVIA DINÁMICA)
    const [selectedColorTheme, setSelectedColorTheme] = useState(colorTheme || '#5D3FD3');
    const [gradientColorTheme, setGradientColorTheme] = useState(gradientTheme || '#000000');
    const [selectedColorBg, setColorBg] = useState(bgDivsTheme || '#1B1C1D');

    // Desestructurar el registro de RHF para aislar las propiedades de control
    const { onChange: colorThemeRHFOnChange, ...colorThemeRegisterProps } = register('color_theme');
    const { onChange: gradientRHFOnChange, ...gradientRegisterProps } = register('background');
    const { onChange: bgDivsRHFOnChange, ...bgDivsRegisterProps } = register('background_divs');


    // HANDLERS UNIFICADOS
    const handleColorChange = (event) => {
        const value = event.target.value;
        setSelectedColorTheme(value);
        colorThemeRHFOnChange(event);
    }

    const handleGradientChange = (event) => {
        const value = event.target.value;
        setGradientColorTheme(value);
        gradientRHFOnChange(event);
    }

    const handleColorChangeBg = (event) => {
        const value = event.target.value;
        setColorBg(value);
        bgDivsRHFOnChange(event);
    }

    return (
        <div className='premium-card__section'>
            <h3 className='premium-card__title'> vista previa de FalaxPremium</h3>

            {/* VISTA PREVIA */}
            <div
                className='premium-card__preview'
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${selectedColorBg} 58%, ${gradientColorTheme} 92%)`
                }}
            >
                {/* ⭐ IMAGEN DE PORTADA REINCORPORADA ⭐ */}
                <div className='premium-card__preview__cover-container'>
                    <img src={coverImg} alt="coverImagePreview" className='premium-card__preview__cover' />
                </div>
                {/* IMAGEN DE PERFIL */}
                <div className='premium-card__preview__profile-container'>
                    <img
                        src={img}
                        alt="ProfileImagePreview"
                        className='premium-card__preview__profile'
                        style={{ borderColor: `${selectedColorTheme}` }}
                    />
                </div>
            </div>

            {/* FORMULARIO DE COLORES */}
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // <--- PREVENCIÓN EXPLÍCITA DE LA RECARGA
                    onSubmitColors(e); // Llama al handler de RHF
                }}
            >
                <div className='premium-card__color-picker'>

                    {/* INPUT BORDE */}
                    <div className='premium-card__color-picker__group'>
                        <input
                            type='color'
                            className='premium-card__color-picker__group__input'
                            value={selectedColorTheme}
                            style={{ borderColor: selectedColorTheme }}
                            onChange={handleColorChange}
                            {...colorThemeRegisterProps}
                        />
                        <p className='premium-card__color-picker__group__title'>Borde</p>
                    </div>

                    {/* INPUT PRIMARIO (FONDO DIVS) */}
                    <div className='premium-card__color-picker__group'>
                        <input
                            type='color'
                            className='premium-card__color-picker__group__input'
                            value={selectedColorBg}
                            style={{ borderColor: selectedColorBg }}
                            onChange={handleColorChangeBg}
                            {...bgDivsRegisterProps}
                        />
                        <p className='premium-card__color-picker__group__title'>primario</p>
                    </div>

                    {/* INPUT SECUNDARIO (GRADIENTE) */}
                    <div className='premium-card__color-picker__group'>
                        <input
                            type='color'
                            className='premium-card__color-picker__group__input'
                            value={gradientColorTheme}
                            style={{ borderColor: gradientColorTheme }}
                            onChange={handleGradientChange}
                            {...gradientRegisterProps}
                        />
                        <p className='premium-card__color-picker__group__title'>Secundario</p>
                    </div>
                </div>

                <button type='submit' className='modal-form__btn-submit update-colors__btn'>
                    Actualizar Solo Colores 🎨
                </button>
            </form>

        </div>
    )
}