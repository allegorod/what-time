document.addEventListener('DOMContentLoaded', function() {
    
    const phoneInput = document.getElementById('phoneInput');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    
    if (!phoneInput || !resultsDiv || !errorDiv) {
        console.error('Not all DOM elements found');
        return;
    }

    phoneInput.value = '+';

    function parseUTCOffset(utcString) {
        const match = utcString.match(/UTC([+-]?)(\d+)(:(\d+))?/);
        if (!match) return 0;
        
        const sign = match[1] === '-' ? -1 : 1;
        const hours = parseInt(match[2]);
        const minutes = match[4] ? parseInt(match[4]) / 60 : 0;
        
        return sign * (hours + minutes);
    }

    function getCurrentTime(utcOffset) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const localTime = new Date(utc + (3600000 * utcOffset));
        
        const hours = String(localTime.getHours()).padStart(2, '0');
        const minutes = String(localTime.getMinutes()).padStart(2, '0');
        
        return `${hours}:${minutes}`;
    }

    function getAreaCodeTime(digits) {
        if (digits.length >= 4) {
            const areaCode = digits.substring(1, 4); // после кода страны 1
            const offset = areaCodeTimezones[areaCode];
            if (offset !== undefined) {
                return {
                    time: getCurrentTime(offset),
                    timezone: offset >= 0 ? `UTC+${offset}` : `UTC${offset}`
                };
            }
        }
        return null;
    }

    function findMatchingCountries(digits) {
        // Ищем точные совпадения от длинного к короткому
        for (let len = Math.min(digits.length, 4); len > 0; len--) {
            const code = digits.substring(0, len);
            if (phoneDatabase[code]) {
                return phoneDatabase[code].map(country => ({
                    ...country,
                    matchedCode: code
                }));
            }
        }
        
        return [];
    }

    function displayResults(countries, digits) {
        if (countries.length === 0) {
            resultsDiv.innerHTML = '';
            errorDiv.textContent = 'Could not determine country by number';
            errorDiv.classList.remove('hidden');
            return;
        }
        
        errorDiv.classList.add('hidden');
        
        let html = '';
        countries.forEach(country => {
            // Для США/Канады проверяем area code
            if (country.hasAreaCodes && digits.length >= 4) {
                const areaCodeData = getAreaCodeTime(digits);
                if (areaCodeData) {
                    html += `
                        <div class="result">
                            <div class="flag">${country.flag}</div>
                            <div class="info">
                                <div class="country">${country.country}</div>
                                <div class="time">${areaCodeData.time}</div>
                                <div class="timezone">${areaCodeData.timezone}</div>
                            </div>
                        </div>
                    `;
                    return;
                }
            }
            
            // Обычное отображение
            const times = country.timezones.map(tz => {
                const offset = parseUTCOffset(tz);
                return getCurrentTime(offset);
            });
            
            const uniqueTimes = [...new Set(times)];
            
            html += `
                <div class="result">
                    <div class="flag">${country.flag}</div>
                    <div class="info">
                        <div class="country">${country.country}</div>
                        <div class="time">${uniqueTimes.join(' - ')}</div>
                        <div class="timezone">${country.timezones.join(', ')}</div>
                    </div>
                </div>
            `;
        });
        
        resultsDiv.innerHTML = html;
    }

    phoneInput.addEventListener('focus', function() {
        if (phoneInput.value === '+') {
            setTimeout(() => phoneInput.setSelectionRange(1, 1), 0);
        }
    });

    phoneInput.addEventListener('keydown', function(e) {
        if ((e.key === 'Backspace' || e.key === 'Delete') && phoneInput.value === '+') {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        if (!value.startsWith('+')) {
            value = '+' + value.replace(/\+/g, '');
            phoneInput.value = value;
        }
        
        const digits = value.substring(1).replace(/\D/g, '');
        
        if (digits.length === 0) {
            resultsDiv.innerHTML = '';
            errorDiv.classList.add('hidden');
            return;
        }
        
        const countries = findMatchingCountries(digits);
        displayResults(countries, digits);
    });
    
});
