export const convertToFahrenheit = (tempRange) => {
    const [minTemp, maxTemp] = tempRange.split(' - ').map(temp => 
      parseFloat(temp.replace('°C', ''))
    );
  
    const minTempF = (minTemp * 9/5) + 32;
    const maxTempF = (maxTemp * 9/5) + 32;
  
    return `${minTempF.toFixed(1)}°F - ${maxTempF.toFixed(1)}°F`;
  }
  