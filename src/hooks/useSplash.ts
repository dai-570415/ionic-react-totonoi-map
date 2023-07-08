import { useEffect, useState } from 'react';

export const useSplash = () => {
    const [splash, setSplash] = useState<boolean>(true);
    useEffect(() => {
      const timer = setTimeout(() => setSplash(false), 4000);
      return () => clearTimeout(timer);
    }, []);

    return { splash };
}