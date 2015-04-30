QUnit.test("Correct server", function(assert) {
  assert.strictEqual(dash.server === "http://" + location.host, true);
});
