const phoneInput = document.getElementById('phoneInput');
const result = document.getElementById('result');
const errorDiv = document.getElementById('error');
const flagDiv = document.getElementById('flag');
const countryDiv = document.getElementById('country');
const timeDiv = document.getElementById('time');
const timezoneDiv = document.getElementById('timezone');

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

phoneInput.value = '+';

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

function getLocalTimeFromTimezone(tzName) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('ru-RU', {
            timeZone: tzName,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const timeString = formatter.format(now);
        
        return {
            time: timeString,
            timezone: tzName.split('/').pop().replace(/_/g, ' ')
        };
    } catch (e) {
        return null;
    }
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
    
    if (value === '+') {
        result.classList.add('hidden');
        errorDiv.classList.add('hidden');
        return;
    }
    
    try {
        const phoneNumber = phoneUtil.parse(value);
        const regionCode = phoneUtil.getRegionCodeForNumber(phoneNumber);
        
        if (regionCode) {
            const flag = countryFlags[regionCode] || '🌍';
            const country = countryNames[regionCode] || regionCode;
            
            // Получаем timezone - берем первую из списка
            const timezoneData = getLocalTimeFromTimezone('Europe/Moscow'); // fallback
            
            flagDiv.textContent = flag;
            countryDiv.textContent = country;
            timeDiv.textContent = timezoneData.time;
            timezoneDiv.textContent = timezoneData.timezone;
            
            result.classList.remove('hidden');
            errorDiv.classList.add('hidden');
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
