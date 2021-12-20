import React from 'react';

import {Alert} from 'react-native';

export const AlertBox = () =>
  Alert.alert('Warning!', "You haven't select the category", [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export const AlertProfileUpdate = (title, details) =>
  Alert.alert(title, details, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
export const AlertProfileUpdate2 = (title, details, onPress) =>
  Alert.alert(title, details, [{text: 'OK', onPress: onPress}]);
export const AlertProfileUpdate4 = (title, details, onPress, onPressCancel) =>
  Alert.alert(title, details, [
    {text: 'Cancel', onPress: onPressCancel},
    {text: 'OK', onPress: onPress},
  ]);
export const AlertProfileUpdate3 = (title, onPressOk, onPressCancel) =>
  Alert.alert(
    title,
    " 1. Terms\
By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law.\
2. Disclaimer\
    The materials on The Dummy Place's web site are provided \"as is\". The Dummy Place makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, The Dummy Place does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.\
3. Limitations\
In no event shall The Dummy Place or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on The Dummy Place's Internet site, even if The Dummy Place or a The Dummy Place authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.\
4. Revisions and Errata\
The materials appearing on The Dummy Place's web site could include technical, typographical, or photographic errors. The Dummy Place does not warrant that any of the materials on its web site are accurate, complete, or current. The Dummy Place may make changes to the materials contained on its web site at any time without notice. The Dummy Place does not, however, make any commitment to update the materials.\
5. Links\
The Dummy Place has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by The Dummy Place of the site. Use of any such linked web site is at the user's own risk.\
6. Site Terms of Use Modifications\
The Dummy Place may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.\
7. Governing Law\
Any claim relating to The Dummy Place's web site shall be governed by the laws of the State of Massachusetts without regard to its conflict of law provisions.\
\
\
General Terms and Conditions applicable to Use of a Web Site.\
Privacy Policy\
\
Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.\
\
    Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.\
    We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.\
    We will only retain personal information as long as necessary for the fulfillment of those purposes.\
    We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.\
    Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.\
    We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.\
    We will make readily available to customers information about our policies and practices relating to the management of personal information.\
\
We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.",
    [
      {text: 'Disagree', onPress: onPressCancel},
      {text: 'Agree', onPress: onPressOk},
    ],
  );
