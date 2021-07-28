import 'package:flutter/material.dart';

class ButtonGroup extends StatelessWidget {
  final String label;
  ButtonGroup(this.label);
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      return new Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            alignment: Alignment.centerLeft,
            width: constraints.maxWidth > 760
                ? MediaQuery.of(context).size.width / 2
                : MediaQuery.of(context).size.width,
            child: Row(
              children: <Widget>[
                Expanded(
                  child: Row(
                    children: <Widget>[
                      Expanded(
                          child: OutlinedButton.icon(
                        onPressed: null,
                        style: ButtonStyle(
                          padding: MaterialStateProperty.all(EdgeInsets.symmetric(vertical: 0)),
                          shape: MaterialStateProperty.all(
                              RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(0.0))),
                        ),
                        icon:  (Image.asset('assets/png/whats_app.png')),
                        label: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 15),
                          child: const Text(
                            "Share Bill",
                          ),
                        ),
                      )),
                      Expanded(
                          child: new ElevatedButton(
                        child: new Text(label,
                        ),
                        onPressed: () => Navigator.pushNamed(context, "home"),
                      ))
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      );
    });
  }
}
