export default ({ router }) => {
  // ...

  router.onReady(() => {
    const { hash } = document.location;
    setTimeout(() => {
      if (hash.length > 1) {
        const id = decodeURIComponent(hash);
        const el = document.querySelector(
          `.reco-side-${decodeURIComponent(id).substring(1)}`
        );
        el.click();
      }
    }, 1000);
  });
};
