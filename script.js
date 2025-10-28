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
            const areaCode = digits.substring(1, 4);
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
        const matches = [];
        
        // Ищем ВСЕ коды, которые начинаются с введенных цифр
        for (const code in phoneDatabase) {
            if (code.startsWith(digits)) {
                phoneDatabase[code].forEach(country => {
                    matches.push({
                        ...country,
                        matchedCode: code,
                        codeLength: code.length
                    });
                });
            }
        }
        
        // Сортируем по длине кода (сначала короткие)
        matches.sort((a, b) => a.codeLength - b.codeLength);
        
        return matches;
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
            // Для США/Канады с полным номером проверяем area code
            if (country.hasAreaCodes && digits.length >= 4 && digits.startsWith(country.matchedCode)) {
                const areaCodeData = getAreaCodeTime(digits);
                if (areaCodeData) {
                    html += `
                        <div class="result">
                            <div class="flag">${country.flag}</div>
                            <div class="info">
                                <div class="country">${country.country} (+${country.matchedCode})</div>
                                <div class="time">${areaCodeData.time}</div>
                                <div class="timezone">${areaCodeData.timezone}</div>
                            </div>
                        </div>
                    `;
                    return;
                }
            }
            
            // Обычное отображение с показом кода страны
            const times = country.timezones.map(tz => {
                const offset = parseUTCOffset(tz);
                return getCurrentTime(offset);
            });
            
            const uniqueTimes = [...new Set(times)];
            
            html += `
                <div class="result">
                    <div class="flag">${country.flag}</div>
                    <div class="info">
                        <div class="country">${country.country} (+${country.matchedCode})</div>
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
