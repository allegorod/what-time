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
    'RU': 'Russia', 'US': 'USA', 'GB': 'United Kingdom', 'DE': 'Germany', 'FR': 'France',
    'IT': 'Italy', 'ES': 'Spain', 'UA': 'Ukraine', 'BY': 'Belarus', 'KZ': 'Kazakhstan',
    'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'IN': 'India', 'BR': 'Brazil',
    'AU': 'Australia', 'CA': 'Canada', 'MX': 'Mexico', 'AR': 'Argentina', 'TR': 'Turkey',
    'SA': 'Saudi Arabia', 'AE': 'UAE', 'IL': 'Israel', 'EG': 'Egypt', 'ZA': 'South Africa',
    'NG': 'Nigeria', 'KE': 'Kenya', 'TH': 'Thailand', 'VN': 'Vietnam', 'PH': 'Philippines',
    'ID': 'Indonesia', 'MY': 'Malaysia', 'SG': 'Singapore', 'PL': 'Poland', 'NL': 'Netherlands'
};

const countryTimezones = {
    'RU': ['Europe/Moscow'],
    'US': ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'],
    'CA': ['America/Toronto', 'America/Vancouver', 'America/Edmonton', 'America/Winnipeg', 'America/Halifax', 'America/St_Johns'],
    'GB': ['Europe/London'],
    'DE': ['Europe/Berlin'],
    'FR': ['Europe/Paris'],
    'IT': ['Europe/Rome'],
    'ES': ['Europe/Madrid'],
    'UA': ['Europe/Kiev'],
    'BY': ['Europe/Minsk'],
    'KZ': ['Asia/Almaty'],
    'CN': ['Asia/Shanghai'],
    'JP': ['Asia/Tokyo'],
    'KR': ['Asia/Seoul'],
    'IN': ['Asia/Kolkata'],
    'BR': ['America/Sao_Paulo'],
    'AU': ['Australia/Sydney'],
    'MX': ['America/Mexico_City'],
    'AR': ['America/Argentina/Buenos_Aires'],
    'TR': ['Europe/Istanbul'],
    'SA': ['Asia/Riyadh'],
    'AE': ['Asia/Dubai'],
    'IL': ['Asia/Jerusalem'],
    'EG': ['Africa/Cairo'],
    'ZA': ['Africa/Johannesburg'],
    'NG': ['Africa/Lagos'],
    'KE': ['Africa/Nairobi'],
    'TH': ['Asia/Bangkok'],
    'VN': ['Asia/Ho_Chi_Minh'],
    'PH': ['Asia/Manila'],
    'ID': ['Asia/Jakarta'],
    'MY': ['Asia/Kuala_Lumpur'],
    'SG': ['Asia/Singapore'],
    'PL': ['Europe/Warsaw'],
    'NL': ['Europe/Amsterdam']
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
            
            const timezones = countryTimezones[regionCode] || ['UTC'];
            
            if (timezones.length > 1) {
                const timeRanges = timezones.map(tz => {
                    const data = getLocalTimeFromTimezone(tz);
                    return data ? data.time : '';
                }).filter(t => t);
                
                const uniqueTimes = [...new Set(timeRanges)];
                
                flagDiv.textContent = flag;
                countryDiv.textContent = country;
                timeDiv.textContent = uniqueTimes.join(' - ');
                timezoneDiv.textContent = uniqueTimes.length > 1 ? 'Multiple timezones - enter more digits' : timezones[0].split('/').pop().replace(/_/g, ' ');
            } else {
                const timezoneData = getLocalTimeFromTimezone(timezones[0]);
                flagDiv.textContent = flag;
                countryDiv.textContent = country;
                timeDiv.textContent = timezoneData.time;
                timezoneDiv.textContent = timezoneData.timezone;
            }
            
            result.classList.remove('hidden');
            errorDiv.classList.add('hidden');
        }
    } catch (err) {
        if (value.length > 1) {
            errorDiv.textContent = 'Could not determine country by number';
            errorDiv.classList.remove('hidden');
            result.classList.add('hidden');
        } else {
            errorDiv.classList.add('hidden');
            result.classList.add('hidden');
        }
    }
});
