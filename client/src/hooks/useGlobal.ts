import { BehaviorSubject } from 'rxjs';
import { useEffect, useState } from 'react';

const useGlobal = <T>(data: BehaviorSubject<T>): T => {
  const [value, setValue] = useState<T>(data.getValue());

  useEffect(() => {
    const subscription = data.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, []);
  return value;
};

export default useGlobal;
