{ nixpkgs ? import <nixpkgs> {} }:
nixpkgs.mkShell {
	packages = with nixpkgs; [
		python312
		python312Packages.flask
		python312Packages.flask-cors
		python312Packages.numpy
		python312Packages.ml-dtypes
	];
}
