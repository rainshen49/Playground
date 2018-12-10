package string

import "testing"

// Test reversings strings
func Test(t *testing.T) {
	var tests = []struct {
		input, output string
	}{
		{"Hello", "olleH"},
		{"你好", "好你"},
	}
	for _, c := range tests {
		res := Reverse(c.input)
		if res != c.output {
			t.Errorf("Got %q instead of %q", res, c.output)
		}
	}
}
