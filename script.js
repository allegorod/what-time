const phoneInput = document.getElementById('phoneInput');
const result = document.getElementById('result');
const errorDiv = document.getElementById('error');
const flagDiv = document.getElementById('flag');
const countryDiv = document.getElementById('country');
const timeDiv = document.getElementById('time');
const timezoneDiv = document.getElementById('timezone');

// Country flags mapping
const countryFlags = {
    'RU': '🇷🇺', 'US': '🇺🇸', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸',
    'UA': '🇺🇦', 'BY': '🇧🇾', 'KZ': '🇰🇿', 'CN': '🇨🇳', 'JP': '🇯🇵', 'KR': '🇰🇷', 'IN': '🇮🇳',
    'BR': '🇧🇷', 'AU': '🇦🇺', 'CA': '🇨🇦', 'MX': '🇲🇽', 'AR': '🇦🇷', 'TR': '🇹🇷', 'SA': '🇸🇦',
    'AE': '🇦🇪', 'IL': '🇮🇱', 'EG': '🇪🇬', 'ZA': '🇿🇦', 'NG': '🇳🇬', 'KE': '🇰🇪', 'TH': '🇹🇭',
    'VN': '🇻🇳', 'PH': '🇵🇭', 'ID': '🇮🇩', 'MY': '🇲🇾', 'SG': '🇸🇬', 'PL': '🇵🇱', 'NL': '🇳🇱',
    'BE': '🇧🇪', 'AT': '🇦🇹', 'CH': '🇨🇭', 'SE': '🇸🇪', 'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮',
    'PT': '🇵🇹', 'GR': '🇬🇷', 'CZ': '🇨🇿', 'RO': '🇷🇴', 'HU': '🇭🇺', 'BG': '🇧🇬', 'RS': '🇷🇸',
    'HR': '🇭🇷', 'SK': '🇸🇰', 'SI': '🇸🇮', 'LT': '🇱🇹', 'LV': '🇱🇻', 'EE': '🇪🇪', 'IE': '🇮🇪',
    'NZ': '🇳🇿', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪', 'VE': '🇻🇪', 'EC': '🇪🇨', 'UY': '🇺🇾',
    'PY': '🇵🇾', 'BO': '🇧🇴', 'CR': '🇨🇷', 'PA': '🇵🇦', 'GT': '🇬🇹', 'HN': '🇭🇳', 'SV': '🇸🇻',
    'NI': '🇳🇮', 'DO': '🇩🇴', 'CU': '🇨🇺', 'JM': '🇯🇲', 'TT': '🇹🇹', 'BS': '🇧🇸', 'BB': '🇧🇧',
    'PK': '🇵🇰', 'BD': '🇧🇩', 'LK': '🇱🇰', 'NP': '🇳🇵', 'AF': '🇦🇫', 'IR': '🇮🇷', 'IQ': '🇮🇶',
    'SY': '🇸🇾', 'LB': '🇱🇧', 'JO': '🇯🇴', 'KW': '🇰🇼', 'QA': '🇶🇦', 'BH': '🇧🇭', 'OM': '🇴🇲',
    'YE': '🇾🇪', 'AM': '🇦🇲', 'AZ': '🇦🇿', 'GE': '🇬🇪', 'UZ': '🇺🇿', 'TM': '🇹🇲', 'KG': '🇰🇬',
    'TJ': '🇹🇯', 'MN': '🇲🇳', 'MM': '🇲🇲', 'LA': '🇱🇦', 'KH': '🇰🇭', 'BN': '🇧🇳', 'MV': '🇲🇻',
    'DZ': '🇩🇿', 'MA': '🇲🇦', 'TN': '🇹🇳', 'LY': '🇱🇾', 'SD': '🇸🇩', 'ET': '🇪🇹', 'GH': '🇬🇭',
    'CI': '🇨🇮', 'SN': '🇸🇳', 'CM': '🇨🇲', 'UG': '🇺🇬', 'TZ': '🇹🇿', 'AO': '🇦🇴', 'MZ': '🇲🇿',
    'ZW': '🇿🇼', 'BW': '🇧🇼', 'NA': '🇳🇦', 'MU': '🇲🇺', 'RE': '🇷🇪', 'MG': '🇲🇬'
};

const countryNames = {
    'RU': 'Россия', 'US': 'США', 'GB': 'Великобритания', 'DE': 'Германия', 'FR': 'Франция',
    'IT': 'Италия', 'ES': 'Испания', 'UA': 'Украина', 'BY': 'Беларусь', 'KZ': 'Казахстан',
    'CN': 'Китай', 'JP': 'Япония', 'KR': 'Южная Корея', 'IN': 'Индия', 'BR': 'Бразилия',
    'AU': 'Австралия', 'CA': 'Канада', 'MX': 'Мексика', 'AR': 'Аргентина', 'TR': 'Турция',
    'SA': 'Саудовская Аравия', 'AE': 'ОАЭ', 'IL': 'Израиль', 'EG': 'Египет', 'ZA': 'ЮАР',
    'NG': 'Нигерия', 'KE': 'Кения', 'TH': 'Таиланд', 'VN': 'Вьетнам', 'PH': 'Филиппины',
    'ID': 'Индонезия', 'MY': 'Малайзия', 'SG': 'Сингапур', 'PL': 'Польша', 'NL': 'Нидерланды'
};

// Simplified timezone mapping by country
const countryTimezones = {
    'RU': 3, 'US': -5, 'GB': 0, 'DE': 1, 'FR': 1, 'IT': 1, 'ES': 1,
    'UA': 2, 'BY': 3, 'KZ': 6, 'CN': 8, 'JP': 9, 'KR': 9, 'IN': 5.5,
    'BR': -3, 'AU': 10, 'CA': -5, 'MX': -6, 'AR': -3, 'TR': 3, 'SA': 3,
    'AE': 4, 'IL': 2, 'EG': 2, 'ZA': 2, 'NG': 1, 'KE': 3, 'TH': 7,
    'VN': 7, 'PH': 8, 'ID': 7, 'MY': 8, 'SG': 8, 'PL': 1, 'NL': 1,
    'BE': 1, 'AT': 1, 'CH': 1, 'SE': 1, 'NO': 1, 'DK': 1, 'FI': 2,
    'PT': 0, 'GR': 2, 'CZ': 1, 'RO': 2, 'HU': 1, 'BG': 2, 'RS': 1,
    'HR': 1, 'SK': 1, 'SI': 1, 'LT': 2, 'LV': 2, 'EE': 2, 'IE': 0,
    'NZ': 12, 'CL': -3, 'CO': -5, 'PE': -5, 'VE': -4, 'EC': -5
};

// Initialize with + sign
phoneInput.value = '+';

function getLocalTime(countryCode) {
    const offset = countryTimezones[countryCode] || 0;
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (3600000 * offset));
    
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    
    return {
        time: `${hours}:${minutes}`,
        offset: offset >= 0 ? `UTC+${offset}` : `UTC${offset}`
    };
}

phoneInput.addEventListener('focus', function() {
    // Курсор в конец после +
    if (phoneInput.value === '+') {
        setTimeout(() => {
            phoneInput.setSelectionRange(1, 1);
        }, 0);
    }
});

phoneInput.addEventListener('keydown', function(e) {
    // Запрещаем удаление +
    if ((e.key === 'Backspace' || e.key === 'Delete') && phoneInput.value === '+') {
        e.preventDefault();
    }
});

phoneInput.addEventListener('input', function(e) {
    let value = e.target.value;
    
    // Всегда оставляем + в начале
    if (!value.startsWith('+')) {
        value = '+' + value.replace(/\+/g, '');
        phoneInput.value = value;
    }
    
    // Если только +, скрываем результаты
    if (value === '+') {
        result.classList.add('hidden');
        errorDiv.classList.add('hidden');
        return;
    }
    
    try {
        const phoneNumber = libphonenumber.parsePhoneNumber(value);
        
        if (phoneNumber && phoneNumber.country) {
            const countryCode = phoneNumber.country;
            const flag = countryFlags[countryCode] || '🌍';
            const country = countryNames[countryCode] || phoneNumber.country;
            const localTime = getLocalTime(countryCode);
            
            flagDiv.textContent = flag;
            countryDiv.textContent = country;
            timeDiv.textContent = localTime.time;
            timezoneDiv.textContent = localTime.offset;
            
            result.classList.remove('hidden');
            errorDiv.classList.add('hidden');
        } else {
            throw new Error('Не удалось определить страну');
        }
    } catch (err) {
        if (value.length > 3) {
            errorDiv.textContent = 'Не удалось определить страну по номеру';
            errorDiv.classList.remove('hidden');
            result.classList.add('hidden');
        } else {
            errorDiv.classList.add('hidden');
            result.classList.add('hidden');
        }
    }
});
