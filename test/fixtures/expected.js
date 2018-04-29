const Foo = styled.div.withConfig({
  displayName: "Foo",
  componentId: "Foo"
})`color:black`;
const Bar = styled(Foo).withConfig({
  displayName: "Bar",
  componentId: "Bar"
})`display:block`;
export const Baz = styled.button.withConfig({
  displayName: "Baz",
  componentId: "Baz"
})`padding:20px;`;
() => {
  const Demo = styled.aside.withConfig({
    displayName: "Demo",
    componentId: "Demo"
  })`cursor:default;`;
};
