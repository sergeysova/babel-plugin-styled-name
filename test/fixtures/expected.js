const Foo = styled.div`color:black`;
Foo.displayName = "Foo";
const Bar = styled(Foo)`display:block`;
Bar.displayName = "Bar";
export const Baz = styled.button`padding:20px;`;
Baz.displayName = "Baz";
() => {
  const Demo = styled.aside`cursor:default;`;Demo.displayName = "Demo";
};
