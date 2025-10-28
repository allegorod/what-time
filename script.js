document.addEventListener('DOMContentLoaded', function() {
    
    const phoneInput = document.getElementById('phoneInput');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    
    if (!phoneInput || !resultsDiv || !errorDiv) {
        console.error('Not all DOM elements found');
        return;
    }

    phoneInput.value = '+';
    let lastSuccessfulResult = null; // Сохраняем последний успешный результат

    // Карта area code к названиям регионов (та же что была)
    const areaCodeRegions = {
        '201': { name: 'New Jersey', offset: -5 },
        '202': { name: 'Washington DC', offset: -5 },
        '203': { name: 'Connecticut', offset: -5 },
        '207': { name: 'Maine', offset: -5 },
        '212': { name: 'New York City', offset: -5 },
        '215': { name: 'Philadelphia', offset: -5 },
        '216': { name: 'Cleveland', offset: -5 },
        '234': { name: 'Ohio', offset: -5 },
        '239': { name: 'Florida', offset: -5 },
        '240': { name: 'Maryland', offset: -5 },
        '248': { name: 'Michigan', offset: -5 },
        '252': { name: 'North Carolina', offset: -5 },
        '267': { name: 'Philadelphia', offset: -5 },
        '269': { name: 'Michigan', offset: -5 },
        '301': { name: 'Maryland', offset: -5 },
        '302': { name: 'Delaware', offset: -5 },
        '304': { name: 'West Virginia', offset: -5 },
        '305': { name: 'Miami', offset: -5 },
        '315': { name: 'Syracuse', offset: -5 },
        '321': { name: 'Orlando', offset: -5 },
        '330': { name: 'Ohio', offset: -5 },
        '336': { name: 'North Carolina', offset: -5 },
        '347': { name: 'New York City', offset: -5 },
        '351': { name: 'Massachusetts', offset: -5 },
        '352': { name: 'Florida', offset: -5 },
        '386': { name: 'Florida', offset: -5 },
        '401': { name: 'Rhode Island', offset: -5 },
        '404': { name: 'Atlanta', offset: -5 },
        '407': { name: 'Orlando', offset: -5 },
        '410': { name: 'Baltimore', offset: -5 },
        '412': { name: 'Pittsburgh', offset: -5 },
        '413': { name: 'Massachusetts', offset: -5 },
        '419': { name: 'Ohio', offset: -5 },
        '423': { name: 'Tennessee', offset: -5 },
        '434': { name: 'Virginia', offset: -5 },
        '440': { name: 'Ohio', offset: -5 },
        '443': { name: 'Maryland', offset: -5 },
        '508': { name: 'Massachusetts', offset: -5 },
        '513': { name: 'Cincinnati', offset: -5 },
        '517': { name: 'Michigan', offset: -5 },
        '518': { name: 'New York', offset: -5 },
        '561': { name: 'Florida', offset: -5 },
        '585': { name: 'Rochester NY', offset: -5 },
        '586': { name: 'Michigan', offset: -5 },
        '607': { name: 'New York', offset: -5 },
        '614': { name: 'Columbus OH', offset: -5 },
        '616': { name: 'Michigan', offset: -5 },
        '617': { name: 'Boston', offset: -5 },
        '631': { name: 'Long Island', offset: -5 },
        '646': { name: 'New York City', offset: -5 },
        '678': { name: 'Georgia', offset: -5 },
        '703': { name: 'Virginia', offset: -5 },
        '704': { name: 'North Carolina', offset: -5 },
        '706': { name: 'Georgia', offset: -5 },
        '716': { name: 'Buffalo', offset: -5 },
        '718': { name: 'New York City', offset: -5 },
        '724': { name: 'Pennsylvania', offset: -5 },
        '727': { name: 'Florida', offset: -5 },
        '732': { name: 'New Jersey', offset: -5 },
        '734': { name: 'Michigan', offset: -5 },
        '740': { name: 'Ohio', offset: -5 },
        '754': { name: 'Florida', offset: -5 },
        '757': { name: 'Virginia', offset: -5 },
        '772': { name: 'Florida', offset: -5 },
        '774': { name: 'Massachusetts', offset: -5 },
        '781': { name: 'Massachusetts', offset: -5 },
        '786': { name: 'Miami', offset: -5 },
        '802': { name: 'Vermont', offset: -5 },
        '803': { name: 'South Carolina', offset: -5 },
        '810': { name: 'Michigan', offset: -5 },
        '813': { name: 'Tampa', offset: -5 },
        '828': { name: 'North Carolina', offset: -5 },
        '845': { name: 'New York', offset: -5 },
        '850': { name: 'Florida', offset: -5 },
        '856': { name: 'New Jersey', offset: -5 },
        '857': { name: 'Boston', offset: -5 },
        '859': { name: 'Kentucky', offset: -5 },
        '862': { name: 'New Jersey', offset: -5 },
        '863': { name: 'Florida', offset: -5 },
        '864': { name: 'South Carolina', offset: -5 },
        '865': { name: 'Tennessee', offset: -5 },
        '878': { name: 'Pennsylvania', offset: -5 },
        '904': { name: 'Jacksonville', offset: -5 },
        '908': { name: 'New Jersey', offset: -5 },
        '910': { name: 'North Carolina', offset: -5 },
        '912': { name: 'Georgia', offset: -5 },
        '914': { name: 'New York', offset: -5 },
        '917': { name: 'New York City', offset: -5 },
        '919': { name: 'North Carolina', offset: -5 },
        '929': { name: 'New York City', offset: -5 },
        '931': { name: 'Tennessee', offset: -5 },
        '941': { name: 'Florida', offset: -5 },
        '954': { name: 'Florida', offset: -5 },
        '973': { name: 'New Jersey', offset: -5 },
        '978': { name: 'Massachusetts', offset: -5 },
        '980': { name: 'North Carolina', offset: -5 },
        '989': { name: 'Michigan', offset: -5 },
        '204': { name: 'Manitoba', offset: -6 },
        '205': { name: 'Alabama', offset: -6 },
        '210': { name: 'San Antonio', offset: -6 },
        '214': { name: 'Dallas', offset: -6 },
        '217': { name: 'Illinois', offset: -6 },
        '218': { name: 'Minnesota', offset: -6 },
        '219': { name: 'Indiana', offset: -6 },
        '224': { name: 'Illinois', offset: -6 },
        '225': { name: 'Louisiana', offset: -6 },
        '228': { name: 'Mississippi', offset: -6 },
        '251': { name: 'Alabama', offset: -6 },
        '254': { name: 'Texas', offset: -6 },
        '256': { name: 'Alabama', offset: -6 },
        '260': { name: 'Indiana', offset: -6 },
        '262': { name: 'Wisconsin', offset: -6 },
        '270': { name: 'Kentucky', offset: -6 },
        '281': { name: 'Houston', offset: -6 },
        '306': { name: 'Saskatchewan', offset: -6 },
        '309': { name: 'Illinois', offset: -6 },
        '312': { name: 'Chicago', offset: -6 },
        '314': { name: 'St Louis', offset: -6 },
        '316': { name: 'Kansas', offset: -6 },
        '318': { name: 'Louisiana', offset: -6 },
        '319': { name: 'Iowa', offset: -6 },
        '320': { name: 'Minnesota', offset: -6 },
        '325': { name: 'Texas', offset: -6 },
        '331': { name: 'Illinois', offset: -6 },
        '334': { name: 'Alabama', offset: -6 },
        '337': { name: 'Louisiana', offset: -6 },
        '346': { name: 'Houston', offset: -6 },
        '361': { name: 'Texas', offset: -6 },
        '402': { name: 'Nebraska', offset: -6 },
        '405': { name: 'Oklahoma', offset: -6 },
        '409': { name: 'Texas', offset: -6 },
        '414': { name: 'Milwaukee', offset: -6 },
        '417': { name: 'Missouri', offset: -6 },
        '430': { name: 'Texas', offset: -6 },
        '432': { name: 'Texas', offset: -6 },
        '469': { name: 'Dallas', offset: -6 },
        '478': { name: 'Georgia', offset: -6 },
        '501': { name: 'Arkansas', offset: -6 },
        '504': { name: 'New Orleans', offset: -6 },
        '507': { name: 'Minnesota', offset: -6 },
        '512': { name: 'Austin', offset: -6 },
        '515': { name: 'Iowa', offset: -6 },
        '563': { name: 'Iowa', offset: -6 },
        '601': { name: 'Mississippi', offset: -6 },
        '608': { name: 'Wisconsin', offset: -6 },
        '612': { name: 'Minneapolis', offset: -6 },
        '620': { name: 'Kansas', offset: -6 },
        '630': { name: 'Illinois', offset: -6 },
        '636': { name: 'Missouri', offset: -6 },
        '641': { name: 'Iowa', offset: -6 },
        '651': { name: 'St Paul', offset: -6 },
        '660': { name: 'Missouri', offset: -6 },
        '662': { name: 'Mississippi', offset: -6 },
        '682': { name: 'Texas', offset: -6 },
        '708': { name: 'Illinois', offset: -6 },
        '712': { name: 'Iowa', offset: -6 },
        '713': { name: 'Houston', offset: -6 },
        '715': { name: 'Wisconsin', offset: -6 },
        '731': { name: 'Tennessee', offset: -6 },
        '737': { name: 'Austin', offset: -6 },
        '763': { name: 'Minnesota', offset: -6 },
        '773': { name: 'Chicago', offset: -6 },
        '785': { name: 'Kansas', offset: -6 },
        '806': { name: 'Texas', offset: -6 },
        '815': { name: 'Illinois', offset: -6 },
        '817': { name: 'Fort Worth', offset: -6 },
        '830': { name: 'Texas', offset: -6 },
        '832': { name: 'Houston', offset: -6 },
        '847': { name: 'Illinois', offset: -6 },
        '870': { name: 'Arkansas', offset: -6 },
        '901': { name: 'Memphis', offset: -6 },
        '903': { name: 'Texas', offset: -6 },
        '913': { name: 'Kansas', offset: -6 },
        '918': { name: 'Oklahoma', offset: -6 },
        '920': { name: 'Wisconsin', offset: -6 },
        '936': { name: 'Texas', offset: -6 },
        '940': { name: 'Texas', offset: -6 },
        '952': { name: 'Minnesota', offset: -6 },
        '956': { name: 'Texas', offset: -6 },
        '972': { name: 'Dallas', offset: -6 },
        '979': { name: 'Texas', offset: -6 },
        '985': { name: 'Louisiana', offset: -6 },
        '303': { name: 'Denver', offset: -7 },
        '307': { name: 'Wyoming', offset: -7 },
        '385': { name: 'Utah', offset: -7 },
        '403': { name: 'Calgary', offset: -7 },
        '406': { name: 'Montana', offset: -7 },
        '435': { name: 'Utah', offset: -7 },
        '505': { name: 'New Mexico', offset: -7 },
        '575': { name: 'New Mexico', offset: -7 },
        '602': { name: 'Phoenix', offset: -7 },
        '623': { name: 'Arizona', offset: -7 },
        '480': { name: 'Arizona', offset: -7 },
        '520': { name: 'Tucson', offset: -7 },
        '928': { name: 'Arizona', offset: -7 },
        '719': { name: 'Colorado', offset: -7 },
        '720': { name: 'Denver', offset: -7 },
        '970': { name: 'Colorado', offset: -7 },
        '587': { name: 'Alberta', offset: -7 },
        '780': { name: 'Edmonton', offset: -7 },
        '825': { name: 'Alberta', offset: -7 },
        '206': { name: 'Seattle', offset: -8 },
        '209': { name: 'California', offset: -8 },
        '213': { name: 'Los Angeles', offset: -8 },
        '250': { name: 'BC', offset: -8 },
        '253': { name: 'Tacoma', offset: -8 },
        '310': { name: 'Los Angeles', offset: -8 },
        '323': { name: 'Los Angeles', offset: -8 },
        '360': { name: 'Washington', offset: -8 },
        '408': { name: 'San Jose', offset: -8 },
        '415': { name: 'San Francisco', offset: -8 },
        '424': { name: 'Los Angeles', offset: -8 },
        '425': { name: 'Seattle', offset: -8 },
        '442': { name: 'California', offset: -8 },
        '503': { name: 'Portland', offset: -8 },
        '509': { name: 'Washington', offset: -8 },
        '510': { name: 'Oakland', offset: -8 },
        '530': { name: 'California', offset: -8 },
        '541': { name: 'Oregon', offset: -8 },
        '559': { name: 'Fresno', offset: -8 },
        '562': { name: 'Long Beach', offset: -8 },
        '619': { name: 'San Diego', offset: -8 },
        '626': { name: 'Pasadena', offset: -8 },
        '650': { name: 'San Mateo', offset: -8 },
        '657': { name: 'California', offset: -8 },
        '661': { name: 'California', offset: -8 },
        '669': { name: 'San Jose', offset: -8 },
        '707': { name: 'California', offset: -8 },
        '714': { name: 'Orange County', offset: -8 },
        '747': { name: 'Los Angeles', offset: -8 },
        '760': { name: 'California', offset: -8 },
        '805': { name: 'California', offset: -8 },
        '818': { name: 'Los Angeles', offset: -8 },
        '831': { name: 'California', offset: -8 },
        '858': { name: 'San Diego', offset: -8 },
        '909': { name: 'California', offset: -8 },
        '916': { name: 'Sacramento', offset: -8 },
        '925': { name: 'California', offset: -8 },
        '949': { name: 'Orange County', offset: -8 },
        '951': { name: 'California', offset: -8 },
        '971': { name: 'Oregon', offset: -8 }
        '506': { name: 'New Brunswick', offset: -4 },  // ← Вот этот!
        '613': { name: 'Ottawa', offset: -5 },
        '705': { name: 'Ontario', offset: -5 },
        '807': { name: 'Ontario', offset: -5 },
        '902': { name: 'Nova Scotia', offset: -4 },
        '709': { name: 'Newfoundland', offset: -3.5 },
    };

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

    function findMatchingCountries(digits) {
        const matches = [];
        
        // Специальная обработка для +1 (США/Канада)
        if (digits.startsWith('1')) {
            if (digits.length === 1) {
                matches.push({
                    country: 'USA / Canada',
                    flag: '🇺🇸🇨🇦',
                    hint: 'Input 3 more digits for area code',
                    matchedCode: '1'
                });
            } else if (digits.length >= 2 && digits.length <= 4) {
                const areaPrefix = digits.substring(1);
                for (const areaCode in areaCodeRegions) {
                    if (areaCode.startsWith(areaPrefix)) {
                        const region = areaCodeRegions[areaCode];
                        matches.push({
                            country: region.name,
                            flag: '📍',
                            time: getCurrentTime(region.offset),
                            timezone: region.offset >= 0 ? `UTC+${region.offset}` : `UTC${region.offset}`,
                            matchedCode: '1' + areaCode
                        });
                    }
                }
            } else if (digits.length > 4) {
                // Полный номер - берем area code и показываем результат
                const areaCode = digits.substring(1, 4);
                const region = areaCodeRegions[areaCode];
                if (region) {
                    matches.push({
                        country: region.name,
                        flag: '📍',
                        time: getCurrentTime(region.offset),
                        timezone: region.offset >= 0 ? `UTC+${region.offset}` : `UTC${region.offset}`,
                        matchedCode: '1' + areaCode
                    });
                }
            }
            return matches;
        }
        
        // Для остальных стран - ищем самое длинное совпадение
        let bestMatch = null;
        for (const code in phoneDatabase) {
            if (digits.startsWith(code)) {
                if (!bestMatch || code.length > bestMatch.length) {
                    bestMatch = code;
                }
            }
        }
        
        if (bestMatch) {
            phoneDatabase[bestMatch].forEach(country => {
                matches.push({
                    ...country,
                    matchedCode: bestMatch,
                    codeLength: bestMatch.length
                });
            });
        }
        
        return matches;
    }

    function displayResults(countries) {
        if (countries.length === 0) {
            // Если нет результата, но был успешный ранее - показываем его
            if (lastSuccessfulResult) {
                resultsDiv.innerHTML = lastSuccessfulResult;
                errorDiv.classList.add('hidden');
                return;
            }
            
            resultsDiv.innerHTML = '';
            errorDiv.textContent = 'Could not determine country by number';
            errorDiv.classList.remove('hidden');
            return;
        }
        
        errorDiv.classList.add('hidden');
        
        let html = '';
        countries.forEach(country => {
            if (country.hint) {
                html += `
                    <div class="result">
                        <div class="flag">${country.flag}</div>
                        <div class="info">
                            <div class="country">${country.country} (+${country.matchedCode})</div>
                            <div class="timezone">${country.hint}</div>
                        </div>
                    </div>
                `;
            } else if (country.time) {
                html += `
                    <div class="result">
                        <div class="flag">${country.flag}</div>
                        <div class="info">
                            <div class="country">${country.country}</div>
                            <div class="time">${country.time}</div>
                            <div class="timezone">${country.timezone}</div>
                        </div>
                    </div>
                `;
            } else {
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
            }
        });
        
        resultsDiv.innerHTML = html;
        lastSuccessfulResult = html; // Сохраняем успешный результат
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
            lastSuccessfulResult = null;
            return;
        }
        
        const countries = findMatchingCountries(digits);
        displayResults(countries);
    });
    
});
