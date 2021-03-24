import React from 'react';
import { useLoading, Oval } from "@agney/react-loading";

const Loader = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="50" />
  });

  return (
    <section {...containerProps}>
      {indicatorEl}
    </section>
  );
};

export default Loader;
